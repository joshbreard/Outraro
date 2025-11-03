import { z } from "zod";

const deliverabilitySchema = z.object({
  domain: z.string(),
  score: z.number().min(0).max(100),
  spamRate: z.number().min(0).max(1),
  bounceRate: z.number().min(0).max(1),
  recordedAt: z.string()
});

export type DeliverabilityPayload = z.infer<typeof deliverabilitySchema>;

export function parseDeliverabilityPayload(payload: unknown): DeliverabilityPayload {
  return deliverabilitySchema.parse(payload);
}
