"use server";

import { revalidatePath } from "next/cache";

export async function recordDeliverabilityEvent(data: { domain: string; score: number }) {
  // TODO: persist event
  console.log("deliverability", data);
  revalidatePath("/dashboard/deliverability");
}
