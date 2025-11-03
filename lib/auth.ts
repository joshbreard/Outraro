import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { z } from "zod";

import { prisma } from "./prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "client";
        session.user.clientAccountId = (token.clientAccountId as string | null) ?? null;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          id: true,
          role: true,
          clientAccountId: true
        }
      });

      if (user) {
        token.role = user.role;
        token.clientAccountId = user.clientAccountId;
      }

      return token;
    }
  }
};

export type Role = "client" | "manager" | "admin";
