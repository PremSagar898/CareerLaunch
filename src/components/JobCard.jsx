import { Link } from "react-router-dom";
import CompanyLogo from "./CompanyLogo.jsx";
import { companies } from "../data/companies.js";
import { expLabel } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";

export default function JobCard({ job }) {
  const { isSaved, toggleSave } = useApp();
  const company = companies.find((c) => c.id === job.companyId);
  const saved = isSaved(job.id);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <CompanyLogo company={company} />
        <div className="min-w-0 flex-1">
          <Link to={`/jobs/${job.id}`} className="font-bold hover:text-brand">{job.title}</Link>
          <p className="text-sm text-slate-500">{company.name}</p>
        </div>
        <button onClick={() => toggleSave(job.id)} className={`text-sm font-semibold ${saved ? "text-brand" : "text-slate-500 hover:text-ink"}`} aria-pressed={saved}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="tag">{job.location}</span>
        <span className="tag">{job.salary}</span>
        <span className="tag">{expLabel(job.experience)}</span>
        <span className="tag">{job.type}</span>
      </div>
      <Link to={`/jobs/${job.id}`} className="btn-outline mt-auto">View details</Link>
    </article>
  );
}
