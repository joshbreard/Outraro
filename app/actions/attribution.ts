"use server";

import { revalidatePath } from "next/cache";

export async function createAttributionEntry(data: { dealId: string; value: number }) {
  // TODO: persist to database
  console.log("attribution", data);
  revalidatePath("/dashboard/revenue");
  return { success: true };
}
