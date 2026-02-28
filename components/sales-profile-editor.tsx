"use client";

import { useState, useEffect } from "react";

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

const EXPERIENCE_LEVELS = [
  { value: "new", label: "Brand new (0-3 months)" },
  { value: "getting_started", label: "Getting started (3-12 months)" },
  { value: "experienced", label: "Experienced (1-3 years)" },
  { value: "veteran", label: "Veteran (3+ years)" },
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

export default function SalesProfileEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [productDescription, setProductDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetTitles, setTargetTitles] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [outreachChannels, setOutreachChannels] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [toolsUsed, setToolsUsed] = useState("");
  const [crmUsed, setCrmUsed] = useState("");
  const [teamSize, setTeamSize] = useState("");

  useEffect(() => {
    fetch("/api/sales-profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setProductDescription(data.profile.product_description || "");
          setIndustry(data.profile.industry || "");
          setTargetTitles(data.profile.target_titles || "");
          setCompanySize(data.profile.company_size || "");
          setOutreachChannels(data.profile.outreach_channels || "");
          setExperienceLevel(data.profile.experience_level || "");
          setBiggestChallenge(data.profile.biggest_challenge || "");
          setToolsUsed(data.profile.tools_used || "");
          setCrmUsed(data.profile.crm_used || "");
          setTeamSize(data.profile.team_size || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    await fetch("/api/sales-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_description: productDescription,
        industry,
        target_titles: targetTitles,
        company_size: companySize,
        outreach_channels: outreachChannels,
        experience_level: experienceLevel,
        biggest_challenge: biggestChallenge,
        tools_used: toolsUsed,
        crm_used: crmUsed,
        team_size: teamSize,
      }),
    });

    setMessage("Profile updated. Bolt will use this in your next conversation.");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-surface-200 rounded w-1/3" />
          <div className="h-10 bg-surface-100 rounded-xl" />
          <div className="h-10 bg-surface-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="text-lg font-semibold text-surface-900">Sales Profile</h3>
        <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
          Powers Bolt
        </span>
      </div>
      <p className="text-surface-500 text-sm mb-5">
        Bolt uses this to personalize every answer to your specific situation.
      </p>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Product / Service
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Describe what you sell in 1-2 sentences"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            >
              <option value="">Select...</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            >
              <option value="">Select...</option>
              {EXPERIENCE_LEVELS.map((exp) => (
                <option key={exp.value} value={exp.value}>
                  {exp.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Target Job Titles
          </label>
          <input
            type="text"
            value={targetTitles}
            onChange={(e) => setTargetTitles(e.target.value)}
            placeholder="e.g., VP of Sales, CFO, Head of Marketing"
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Target Company Size
            </label>
            <input
              type="text"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              placeholder="e.g., 201-1,000 employees"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Outreach Channels
            </label>
            <input
              type="text"
              value={outreachChannels}
              onChange={(e) => setOutreachChannels(e.target.value)}
              placeholder="e.g., Cold Email, LinkedIn"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              CRM
            </label>
            <select
              value={crmUsed}
              onChange={(e) => setCrmUsed(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            >
              <option value="">Select...</option>
              {CRMS.map((crm) => (
                <option key={crm} value={crm}>
                  {crm}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              SDRs on Your Team
            </label>
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            >
              <option value="">Select...</option>
              {SDR_TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Tools You Use
          </label>
          <input
            type="text"
            value={toolsUsed}
            onChange={(e) => setToolsUsed(e.target.value)}
            placeholder="e.g., Apollo, Outreach, LinkedIn Sales Nav"
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Biggest Challenge
          </label>
          <input
            type="text"
            value={biggestChallenge}
            onChange={(e) => setBiggestChallenge(e.target.value)}
            placeholder="e.g., Getting replies to cold outreach"
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        {message && (
          <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-xl text-sm glow-btn transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
