export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-surface-900 mb-3">You're in.</h1>
        <p className="text-surface-500 text-lg mb-8 leading-relaxed">Check your email for your login credentials. Your Outraro dashboard is ready.</p>
        <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-surface-900 mb-3">What happens next:</h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3 text-surface-600 text-sm">
              <span className="text-brand-600 font-bold mt-0.5">1</span>
              <span>Check your inbox for the welcome email</span>
            </li>
            <li className="flex items-start gap-3 text-surface-600 text-sm">
              <span className="text-brand-600 font-bold mt-0.5">2</span>
              <span>Use the temporary password to log in</span>
            </li>
            <li className="flex items-start gap-3 text-surface-600 text-sm">
              <span className="text-brand-600 font-bold mt-0.5">3</span>
              <span>Start exploring AI tool breakdowns and workflows</span>
            </li>
          </ul>
        </div>
        <a href="/login"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-xl text-sm glow-btn transition-all">
          Go to Login
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
