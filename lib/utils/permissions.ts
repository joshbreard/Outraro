import type { Role } from "@/lib/auth";

export function canViewClientAccount(role: Role, requestedAccountId: string | null, sessionAccountId: string | null) {
  if (role === "admin" || role === "manager") {
    return true;
  }
  return requestedAccountId === sessionAccountId;
}
