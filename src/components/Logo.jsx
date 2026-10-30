export default function Logo() {
  return (
    <span className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19L19 5M9 5h10v10" /></svg>
      </span>
      CareerLaunch
    </span>
  );
}
