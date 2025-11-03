export interface EmailPerformanceSummary {
  openRate: number;
  replyRate: number;
  positiveRate: number;
}

export async function getEmailPerformanceSummary(clientAccountId: string): Promise<EmailPerformanceSummary> {
  // TODO: compute from email events
  return {
    openRate: 0.48,
    replyRate: 0.14,
    positiveRate: 0.05
  };
}
