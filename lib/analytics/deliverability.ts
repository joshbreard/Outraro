export interface DeliverabilitySummary {
  domainHealthScore: number;
  spamRate: number;
  bounceRate: number;
}

export async function getDeliverabilitySummary(clientAccountId: string): Promise<DeliverabilitySummary> {
  // TODO: aggregate domain health events
  return {
    domainHealthScore: 92,
    spamRate: 0.009,
    bounceRate: 0.013
  };
}
