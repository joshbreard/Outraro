import { z } from "zod";

const meetingPayloadSchema = z.object({
  meetingId: z.string(),
  title: z.string(),
  scheduledFor: z.string(),
  leadEmail: z.string().email(),
  source: z.string().optional()
});

export type MeetingPayload = z.infer<typeof meetingPayloadSchema>;

export function parseMeetingPayload(payload: unknown): MeetingPayload {
  return meetingPayloadSchema.parse(payload);
}
