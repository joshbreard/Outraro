"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "SaaS / Software",
  "Financial Services",
  "Healthcare",
  "E-Commerce / Retail",
  "Professional Services",
  "Manufacturing",
  "Real Estate",
  "Education",
  "Media / Advertising",
  "Other",
];

const COMPANY_SIZES = [
  "1-50 employees",
  "51-200 employees",
  "201-1,000 employees",
  "1,001-5,000 employees",
  "5,000+ employees",
  "I target multiple sizes",
];

const CHANNELS = [
  "Cold Email",
  "LinkedIn",
  "Cold Calling",
  "Referrals",
  "Events / Conferences",
  "Social Selling",
];

const CRMS = [
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "Close",
  "Zoho CRM",
  "Monday Sales CRM",
  "None / Spreadsheets",
  "Other",
];

const SDR_TEAM_SIZES = [
  "Just me",
  "2 to 5 SDRs",
  "6 to 10 SDRs",
  "11 to 25 SDRs",
  "25+ SDRs",
];

const EXPERIENCE_LEVELS = [
  { value: "new", label: "Brand new (0-3 months)" },
  { value: "getting_started", label: "Getting started (3-12 months)" },
  { value: "experienced", label: "Experienced (1-3 years)" },
  { value: "veteran", label: "Veteran (3+ years)" },
];

const CHALLENGES = [
  "Getting replies to cold outreach",
  "Booking enough meetings",
  "Handling objections on calls",
  "Personalizing at scale",
  "Time management and prioritization",
  "Building pipeline from scratch",
  "Moving deals past discovery",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [productDescription, setProductDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetTitles, setTargetTitles] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [toolsUsed, setToolsUsed] = useState("");
  const [crmUsed, setCrmUsed] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");

  const toggleChannel = (ch: string) => {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const canNext = () => {
    if (step === 0) return productDescription.trim().length > 0;
    if (step === 1) return targetTitles.trim().length > 0;
    if (step === 2) return channels.length > 0;
    if (step === 3) return experienceLevel.length > 0;
    return false;
  };

  const handleFinish = async () => {
    setSaving(true);
    await fetch("/api/sales-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_description: productDescription,
        industry,
        target_titles: targetTitles,
        company_size: companySize,
        outreach_channels: channels.join(", "),
        experience_level: experienceLevel,
        biggest_challenge: biggestChallenge,
        tools_used: toolsUsed,
        crm_used: crmUsed,
        team_size: teamSize,
      }),
    });
    router.push("/library");
  };

  const steps = [
    {
      title: "What do you sell?",
      subtitle:
        "Help Bolt understand your product so every answer is specific to your world.",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Describe your product or service
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g., We sell an AI-powered expense management platform that automates receipt capture and approval workflows for mid-market finance teams."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Industry
            </label>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    industry === ind
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Who\u2019s your ideal buyer?",
      subtitle:
        "Bolt will tailor outreach advice to match your target personas.",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Target job titles
            </label>
            <input
              type="text"
              value={targetTitles}
              onChange={(e) => setTargetTitles(e.target.value)}
              placeholder="e.g., VP of Sales, Head of Revenue, CRO"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Target company size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COMPANY_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setCompanySize(size)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    companySize === size
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "How do you reach prospects?",
      subtitle:
        "Select all channels you use. Bolt will prioritize relevant tactics.",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Outreach channels
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CHANNELS.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => toggleChannel(ch)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left flex items-center gap-2 ${
                    channels.includes(ch)
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      channels.includes(ch)
                        ? "bg-brand-600 border-brand-600"
                        : "border-surface-300"
                    }`}
                  >
                    {channels.includes(ch) && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  {ch}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              CRM
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CRMS.map((crm) => (
                <button
                  key={crm}
                  type="button"
                  onClick={() => setCrmUsed(crm)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    crmUsed === crm
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {crm}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Tools you use{" "}
              <span className="text-surface-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={toolsUsed}
              onChange={(e) => setToolsUsed(e.target.value)}
              placeholder="e.g., Apollo, Outreach, LinkedIn Sales Nav"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Tell us about your team",
      subtitle: "This helps Bolt calibrate advice to your experience and team setup.",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              SDRs on your team
            </label>
            <div className="space-y-2">
              {SDR_TEAM_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setTeamSize(size)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    teamSize === size
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Experience level
            </label>
            <div className="space-y-2">
              {EXPERIENCE_LEVELS.map((exp) => (
                <button
                  key={exp.value}
                  type="button"
                  onClick={() => setExperienceLevel(exp.value)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    experienceLevel === exp.value
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Biggest challenge right now
            </label>
            <div className="space-y-2">
              {CHALLENGES.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setBiggestChallenge(ch)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    biggestChallenge === ch
                      ? "bg-brand-50 border-brand-300 text-brand-700 border-2"
                      : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-surface-900">Outraro</span>
        </div>

        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? "bg-brand-600" : "bg-surface-300"
              }`}
            />
          ))}
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-surface-900 mb-1">
            {steps[step].title}
          </h2>
          <p className="text-sm text-surface-500 mb-6">
            {steps[step].subtitle}
          </p>

          {steps[step].content}

          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-surface-500 hover:text-surface-700 transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold py-3 px-8 rounded-xl text-sm transition-all cursor-pointer"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!canNext() || saving}
                className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold py-3 px-8 rounded-xl text-sm transition-all cursor-pointer"
              >
                {saving ? "Setting up..." : "Finish Setup"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-surface-400 mt-4">
          You can update these anytime in Account Settings.
        </p>
      </div>
    </div>
  );
}
