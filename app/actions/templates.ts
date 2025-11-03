"use server";

import { revalidatePath } from "next/cache";

export async function submitTemplateApproval(templateId: string) {
  // TODO: integrate with approval workflow
  console.log(`Template ${templateId} approved`);
  revalidatePath("/dashboard/templates");
}
