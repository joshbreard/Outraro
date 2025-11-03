import { z } from "zod";

const callRecordingSchema = z.object({
  callId: z.string(),
  url: z.string().url(),
  transcript: z.string().optional(),
  summary: z.string().optional()
});

export type CallRecordingPayload = z.infer<typeof callRecordingSchema>;

export function parseCallRecordingPayload(payload: unknown): CallRecordingPayload {
  return callRecordingSchema.parse(payload);
}
