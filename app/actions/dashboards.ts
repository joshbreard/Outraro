"use server";

export async function loadDashboardMetrics(clientAccountId: string) {
  // TODO: fetch metrics from database + analytics layer
  return {
    clientAccountId,
    pipelineValue: 325000,
    meetingsBooked: 42
  };
}
