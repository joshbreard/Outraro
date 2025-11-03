import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const clientAccount = await prisma.clientAccount.upsert({
    where: { slug: "demo-account" },
    update: {},
    create: {
      name: "Demo Account",
      slug: "demo-account"
    }
  });

  await prisma.user.upsert({
    where: { email: "client@outraro.com" },
    update: {},
    create: {
      email: "client@outraro.com",
      name: "Demo Client",
      passwordHash,
      clientAccountId: clientAccount.id
    }
  });

  console.log("Seed data ready");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
