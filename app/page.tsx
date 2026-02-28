import CheckoutButton from "@/components/CheckoutButton";

export default function HomePage() {
  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-surface-900">Outraro</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">The Problem</a>
              <a href="#solution" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">What You Learn</a>
              <a href="#outcomes" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Outcomes</a>
              <a href="#pricing" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Pricing</a>
              <a href="#pricing" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all glow-btn">Join Now</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-brand-700 font-medium">Updated daily with the latest AI tools & workflows</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-surface-900">
                AI is coming for your<span className="gradient-text"> SDR seat.</span>
              </h1>
              <p className="text-xl md:text-2xl text-surface-600 font-medium mb-2">Learn it before it learns you.</p>
              <p className="text-lg text-surface-500 max-w-xl mb-10 leading-relaxed">
                36% of B2B companies already cut their SDR teams in 2025. The ones who survived weren&apos;t lucky. They were ready.
                Outraro keeps you ahead of every AI wave before it hits your org chart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#pricing" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-lg glow-btn inline-flex items-center justify-center gap-2">
                  Become a Member <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#solution" className="border border-surface-300 hover:border-surface-400 text-surface-700 hover:text-surface-900 font-semibold px-8 py-4 rounded-xl text-lg transition-all inline-flex items-center justify-center gap-2">See What&apos;s Inside</a>
              </div>
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div><div className="text-2xl md:text-3xl font-bold text-surface-900">40%</div><div className="text-xs text-surface-500 mt-1">SDR postings<br/>down YoY</div></div>
                <div className="border-x border-surface-200 px-4"><div className="text-2xl md:text-3xl font-bold text-surface-900">60%</div><div className="text-xs text-surface-500 mt-1">AI adoption<br/>by B2B in 2026</div></div>
                <div><div className="text-2xl md:text-3xl font-bold text-surface-900">18mo</div><div className="text-xs text-surface-500 mt-1">To mass<br/>replacement</div></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-100/40 to-brand-50/20 rounded-3xl blur-2xl" />
              <img src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/4324602b-39eb-4bbf-9b31-39211ea7afaf.png" alt="SDR professional using AI tools" className="relative rounded-2xl w-full object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CEO QUOTES */}
      <section className="relative py-20 md:py-28 bg-surface-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-400 font-medium">This isn&apos;t speculation. These are the people building AI.</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Hear it from the CEOs<br/>making the decisions</h2>
            <p className="text-zinc-400 text-lg">The leaders of the biggest AI companies in the world are telling you exactly what&apos;s coming. The question is whether you&apos;re listening.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              { name: "Jack Dorsey", title: "CEO, Block (Square / Cash App)", date: "Feb 26, 2026", img: "https://user-gen-media-assets.s3.amazonaws.com/gemini_images/2a7f86dc-e142-43d8-90a8-d08b0b18c094.png", quote: "Something has changed. The intelligence tools we are developing and utilizing, combined with smaller teams, are fostering a new working paradigm that fundamentally alters the way we build and manage a company.", label: "Action taken", detail: "Laid off 4,000+ employees, 40% of Block's workforce, citing AI tools as the reason. Stock surged 26%." },
              { name: "Mustafa Suleyman", title: "CEO, Microsoft AI", date: "Feb 11, 2026", img: "https://user-gen-media-assets.s3.amazonaws.com/gemini_images/a25a99cb-5893-457b-a824-6d81ced5ced6.png", quote: "White-collar work, where you're sitting down at a computer, either being a lawyer or an accountant or a project manager or a marketing person. Most of those tasks will be fully automated by an AI within the next 12 to 18 months.", label: "Timeline given", detail: 'Told the Financial Times that Microsoft is building "professional-grade AGI" to automate all desk-based work.' },
              { name: "Dario Amodei", title: "CEO, Anthropic (maker of Claude)", date: "May 28, 2025", img: "https://user-gen-media-assets.s3.amazonaws.com/gemini_images/f61b96f6-4c5a-4fb3-89bc-1f7b02d900b7.png", quote: "We, as the producers of this technology, have a duty and an obligation to be honest about what is coming. AI could wipe out 50% of all entry-level white-collar jobs and push unemployment to 10-20%.", label: "Warning issued", detail: 'Told Axios that companies and government are "sugarcoating" the risks. Said entry-level jobs are especially at risk within 1-5 years.' },
            ].map((ceo) => (
              <div key={ceo.name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:translate-y-[-6px] hover:shadow-2xl transition-all duration-400">
                <div className="relative h-56 overflow-hidden">
                  <img src={ceo.img} alt={ceo.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                  <div className="absolute top-4 left-4"><span className="bg-red-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">{ceo.date}</span></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{ceo.name}</h3>
                    <p className="text-zinc-400 text-sm">{ceo.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <svg className="w-8 h-8 text-red-500/30 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.986z" /></svg>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{ceo.quote}&rdquo;</p>
                  <div className="flex items-center gap-1.5 pt-4 border-t border-white/10">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span className="text-red-400 text-xs font-bold uppercase tracking-wider">{ceo.label}</span>
                  </div>
                  <p className="text-zinc-400 text-xs mt-2">{ceo.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-14 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-zinc-300 text-lg leading-relaxed">
                These aren&apos;t bloggers or influencers. These are the people <span className="text-white font-semibold">building the AI</span>, <span className="text-white font-semibold">funding the AI</span>, and <span className="text-white font-semibold">deploying the AI</span>. When they tell you what&apos;s coming, it&apos;s not a prediction. It&apos;s a schedule.
              </p>
              <a href="#pricing" className="inline-flex items-center gap-2 bg-white text-surface-900 font-semibold px-8 py-3.5 rounded-xl text-sm mt-6 hover:bg-surface-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Don&apos;t wait for the memo. Join Outraro.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="relative py-24 md:py-32 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">The Uncomfortable Truth</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-surface-900">The ground is shifting<br/>under your feet</h2>
            <p className="text-surface-500 text-lg">This isn&apos;t some vague &ldquo;AI is coming&rdquo; fear piece. The numbers are already in.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6", color: "bg-red-50 text-red-500", title: "SDR Headcounts Are Shrinking", text: "36% of B2B companies cut their SDR teams in 2025. Job postings are down 40%. Companies are replacing junior reps with AI workflows that cost 80% less." },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "bg-amber-50 text-amber-500", title: "The Window Is Closing", text: "AI SDR adoption jumped from 12% in 2024 to 34% in 2025. By end of 2026, 55-60% of B2B companies will use AI for autonomous prospecting. The majority switch is this year." },
              { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "bg-purple-50 text-purple-500", title: "Your Manager Is Evaluating AI Right Now", text: "AI SDR tools are 50-80% cheaper to operate and 40-60% faster than human-led teams. Leadership doesn't need to hate you to replace you. The math just has to work." },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-surface-200 rounded-2xl p-6 card-hover shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${card.color.split(" ")[0]} flex items-center justify-center mb-4`}>
                  <svg className={`w-6 h-6 ${card.color.split(" ")[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-surface-900">{card.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-12 bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-surface-600 text-lg leading-relaxed"><span className="text-red-600 font-semibold">4 in 10 workers</span> now report anxiety about AI replacing their jobs. Among SDRs, it&apos;s worse. The tools replacing them are already live, already deployed, and already beating their numbers.</p>
          </div>
          <div className="text-center mt-12">
            <a href="#pricing" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-10 py-4 rounded-xl text-lg glow-btn inline-flex items-center justify-center gap-2 transition-all">
              Learn More About The Membership <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* SHIFT */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">The Shift</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-surface-900">The reps who survive<br/>won&apos;t be the hardest workers</h2>
            <p className="text-surface-500 text-lg max-w-2xl mx-auto">They&apos;ll be the ones who learned to work <em>with</em> the machines.</p>
          </div>
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-center">
            <div className="lg:col-span-2 bg-surface-100 border border-surface-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></div>
                <h3 className="text-xl font-bold text-red-600">The Old SDR</h3>
              </div>
              <ul className="space-y-4">
                {["Manual prospecting across 6 tabs", "Generic templates at scale", "70% of the week on admin, not selling", "Can't answer technical buyer questions", "Easily replaceable by a $200/mo tool"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-surface-500 text-sm"><span className="text-red-400 mt-0.5">✕</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </div>
            </div>
            <div className="lg:col-span-2 gradient-border">
              <div className="gradient-border-inner p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center"><svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                  <h3 className="text-xl font-bold text-brand-600">The AI-Fluent SDR</h3>
                </div>
                <ul className="space-y-4">
                  {["Uses AI to research, prioritize, and personalize in minutes", "Builds autonomous workflows that multiply output 5x", "Knows which tools to deploy for every sales motion", "Handles technical questions with AI-assisted depth", "Becomes the person leadership can't afford to lose"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-surface-700 text-sm"><span className="text-brand-600 mt-0.5 font-bold">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="relative py-24 md:py-32 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">What&apos;s Inside Outraro</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-surface-900">The AI toolkit<br/>your company won&apos;t teach you</h2>
            <p className="text-surface-500 text-lg">Every day, we break down the tools reshaping B2B sales with hands-on walkthroughs, real workflows, and zero fluff.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { emoji: "🤖", name: "Claude Cowork", by: "by Anthropic", desc: "Your autonomous AI coworker that reads your files, manages workflows, and executes multi-step tasks across your desktop. We'll teach you how to use it to prep accounts, draft sequences, and build research briefs, hands-free.", tags: ["Account Research", "Document Automation", "Workflow Building"], bg: "bg-orange-50" },
              { emoji: "🖥", name: "Perplexity Computer", by: "by Perplexity AI", desc: "A multi-agent system that orchestrates 19 models to execute complete workflows, from deep research to document generation. Learn to build prospecting pipelines that run autonomously for hours while you focus on closing.", tags: ["Deep Research", "Multi-Agent Workflows", "Pipeline Building"], bg: "bg-blue-50" },
              { emoji: "🍌", name: "Nano Banana", by: "Visual AI", desc: "Generate custom visuals, sales assets, and branded content at speed. We show you how to create prospect-specific one-pagers, personalized video thumbnails, and visual hooks that get replies.", tags: ["Visual Outreach", "Sales Assets", "Brand Content"], bg: "bg-yellow-50" },
              { emoji: "⚡", name: "+ New Tools Monthly", by: "Always current", desc: "AI moves fast. Every month we vet, test, and break down the latest tools hitting the market so you know what's real, what's hype, and what will actually move your pipeline.", tags: ["AI SDR Tools", "Prompt Engineering", "Workflow Templates"], bg: "bg-emerald-50" },
            ].map((tool) => (
              <div key={tool.name} className="bg-white border border-surface-200 rounded-2xl p-8 card-hover shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center text-lg`}>{tool.emoji}</div>
                  <div><h3 className="text-lg font-bold text-surface-900">{tool.name}</h3><span className="text-xs text-surface-500">{tool.by}</span></div>
                </div>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">{tool.desc}</p>
                <div className="flex flex-wrap gap-2">{tool.tags.map((t) => <span key={t} className="bg-surface-100 text-surface-600 text-xs px-3 py-1 rounded-full">{t}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto bg-white border border-surface-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center text-surface-900">Every day, members get:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Deep-dive walkthroughs of every tool", "Copy-paste prompt libraries for sales use cases", "Plug-and-play workflow templates", "\"What's real vs. hype\" tool scorecards", "Daily AI news brief: what changed today"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-surface-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="#pricing" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-10 py-4 rounded-xl text-lg glow-btn inline-flex items-center justify-center gap-2 transition-all">
              Learn More About The Membership <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">Outcomes</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-surface-900">This isn&apos;t about learning AI.<br/>It&apos;s about keeping your career.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden card-hover shadow-sm">
              <img src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/7f087c0c-e8d8-4d69-bd74-8e1c5bee7c7f.png" alt="Sales rep using AI" className="w-full h-48 object-cover" />
              <div className="p-6 text-center"><div className="text-4xl font-black text-brand-600 mb-2">5x</div><h4 className="text-lg font-semibold mb-2 text-surface-900">Output Multiplier</h4><p className="text-surface-500 text-sm">Replace hours of manual prospecting with AI-powered workflows that do the same work in minutes.</p></div>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden card-hover shadow-sm">
              <img src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/e03d54a0-a68a-491a-bc5d-e8b3989caf16.png" alt="SDR on a call" className="w-full h-48 object-cover" />
              <div className="p-6 text-center"><div className="text-4xl font-black text-brand-600 mb-2">↑</div><h4 className="text-lg font-semibold mb-2 text-surface-900">Career Insurance</h4><p className="text-surface-500 text-sm">Become the person who brings AI to the team, not the person AI replaces.</p></div>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden card-hover shadow-sm">
              <div className="w-full h-48 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center"><div className="text-center"><div className="text-6xl font-black text-brand-600">1st</div><div className="text-sm text-brand-500 font-medium mt-1">First to know. First to deploy.</div></div></div>
              <div className="p-6 text-center"><div className="text-4xl font-black text-brand-600 mb-2">1st</div><h4 className="text-lg font-semibold mb-2 text-surface-900">First-Mover Edge</h4><p className="text-surface-500 text-sm">New tools drop daily. Members learn about them before their VP reads about them on LinkedIn.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 md:py-32 bg-surface-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-surface-900">Less than your daily coffee.<br/>More than your current AI knowledge.</h2>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="gradient-border"><div className="gradient-border-inner p-8 md:p-10">
              <div className="flex justify-center mb-6"><span className="bg-brand-50 text-brand-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-brand-200">MOST POPULAR</span></div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-surface-900">Outraro Membership</h3>
                <div className="flex items-baseline justify-center gap-1"><span className="text-5xl md:text-6xl font-black text-surface-900">$59</span><span className="text-surface-500 text-lg">/month</span></div>
                <p className="text-surface-400 text-sm mt-2">Cancel anytime. No contracts.</p>
              </div>
              <div className="space-y-4 mb-8">
                {["Full access to all AI tool breakdowns & walkthroughs", "Daily workflow templates & prompt libraries", 'Daily "What Changed Today" AI news brief', "Tool scorecards: what's real vs. what's hype"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-surface-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <CheckoutButton className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 rounded-xl text-lg glow-btn transition-all cursor-pointer">Start Your Membership</CheckoutButton>
              <p className="text-surface-400 text-xs text-center mt-4">Secure checkout via Stripe. Cancel with one click.</p>
            </div></div>
          </div>
          <div className="max-w-lg mx-auto mt-8 text-center">
            <p className="text-surface-400 text-sm">The average SDR salary is $55,000/year. If this membership keeps you employed even one extra month, it paid for itself <span className="text-surface-700 font-medium">78x over</span>.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-surface-900">Common questions</h2>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-32 bg-surface-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The next round of layoffs<br/>won&apos;t send a calendar invite.</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">AI is already doing your job at companies you&apos;re competing against. The only question is whether you&apos;ll be the one deploying it or the one it replaces.</p>
          <CheckoutButton className="inline-flex items-center gap-2 bg-white hover:bg-surface-100 text-surface-900 font-semibold px-10 py-5 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Join Outraro Today <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </CheckoutButton>
          <p className="text-zinc-500 text-sm mt-6">$59/mo | Cancel anytime | Updated daily</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-surface-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
              <span className="text-lg font-bold text-surface-900">Outraro</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-surface-400">
              <a href="#" className="hover:text-surface-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-surface-700 transition-colors">Terms</a>
              <a href="mailto:hello@outraro.com" className="hover:text-surface-700 transition-colors">Contact</a>
              <a href="/login" className="hover:text-surface-700 transition-colors">Member Login</a>
            </div>
            <p className="text-xs text-surface-400">2026 Outraro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FaqSection() {
  const faqs = [
    { q: "I'm not technical. Is this still for me?", a: "Absolutely. Outraro is designed for sales reps, not developers. Every walkthrough assumes zero coding knowledge. If you can use a CRM, you can follow along." },
    { q: "What if I already use ChatGPT at work?", a: "ChatGPT is a chat box. The tools we cover, like Claude Cowork, Perplexity Computer, and others, are autonomous agents that execute workflows, manage files, and run tasks across your desktop. That's a different category entirely." },
    { q: "How is this different from a YouTube tutorial?", a: "YouTube gives you overviews. We give you the exact workflows, prompts, and templates built specifically for B2B SDRs and AEs. Plus, AI tools change daily. YouTube videos go stale. Outraro stays current because that's the entire point." },
    { q: "Is AI really going to replace SDRs?", a: "Not all of them, but most of the traditional ones, yes. AI SDR adoption is projected to hit 55-60% by end of 2026. The reps who survive are the ones who know how to work alongside these tools, not compete against them." },
    { q: "Can I cancel anytime?", a: "Yes. One click cancellation, no questions asked, no contracts. But once you see how fast AI is moving and how far ahead you are compared to your peers, you probably won't want to." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details key={faq.q} className="bg-surface-100 border border-surface-200 rounded-xl group">
          <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
            <h4 className="text-sm md:text-base font-semibold pr-4 text-surface-900">{faq.q}</h4>
            <svg className="w-5 h-5 text-surface-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="px-6 pb-5"><p className="text-surface-500 text-sm leading-relaxed">{faq.a}</p></div>
        </details>
      ))}
    </div>
  );
}
