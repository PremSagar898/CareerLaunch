import { Link } from "react-router-dom";
import CompanyLogo from "./CompanyLogo.jsx";

export default function CompanyCard({ company }) {
  return (
    <Link to={`/companies/${company.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 hover:border-brand">
      <CompanyLogo company={company} />
      <div>
        <h3 className="font-bold">{company.name}</h3>
        <p className="text-sm text-slate-500">{company.industry} · {company.location}</p>
      </div>
    </Link>
  );
}
