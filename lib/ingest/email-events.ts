import { z } from "zod";

const emailEventSchema = z.object({
  eventId: z.string(),
  inboxId: z.string(),
  leadId: z.string().optional(),
  type: z.enum(["sent", "open", "reply", "positive_reply", "bounce"]),
  occurredAt: z.string()
});

export type EmailEventPayload = z.infer<typeof emailEventSchema>;

export function parseEmailEvent(payload: unknown): EmailEventPayload {
  return emailEventSchema.parse(payload);
}
