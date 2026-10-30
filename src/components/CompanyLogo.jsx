export default function CompanyLogo({ company, size = "h-12 w-12" }) {
  return <div className={`${size} grid shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white`}>{company.logo}</div>;
}
