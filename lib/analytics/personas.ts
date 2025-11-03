export interface PersonaBreakdown {
  title: string;
  meetings: number;
  positives: number;
}

export async function getPersonaBreakdown(clientAccountId: string): Promise<PersonaBreakdown[]> {
  // TODO: aggregate persona data
  return [
    { title: "VP Sales", meetings: 18, positives: 32 },
    { title: "Director Marketing", meetings: 12, positives: 24 },
    { title: "Head of RevOps", meetings: 8, positives: 14 }
  ];
}
