import { parseCallRecordingPayload } from "@/lib/ingest/call-recordings";
import { parseDeliverabilityPayload } from "@/lib/ingest/deliverability-events";
import { parseEmailEvent } from "@/lib/ingest/email-events";
import { parseMeetingPayload } from "@/lib/ingest/meetings";

export function generateMockEmailEvent() {
  return parseEmailEvent({
    eventId: "evt_mock_1",
    inboxId: "inbox_1",
    type: "positive_reply",
    occurredAt: new Date().toISOString()
  });
}

export function generateMockMeeting() {
  return parseMeetingPayload({
    meetingId: "meet_mock_1",
    title: "Discovery call",
    scheduledFor: new Date().toISOString(),
    leadEmail: "lead@example.com"
  });
}

export function generateMockDeliverability() {
  return parseDeliverabilityPayload({
    domain: "outbound.example",
    score: 94,
    spamRate: 0.01,
    bounceRate: 0.02,
    recordedAt: new Date().toISOString()
  });
}

export function generateMockCallRecording() {
  return parseCallRecordingPayload({
    callId: "call_mock_1",
    url: "https://example.com/call.mp3"
  });
}
