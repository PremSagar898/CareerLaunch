import { Link, useParams } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import { jobs, expLabel } from "../data/jobs.js";
import { companies } from "../data/companies.js";
import { useApp } from "../context/AppContext.jsx";

export default function JobDetails() {
  const { jobId } = useParams();
  const { isSaved, toggleSave, hasApplied } = useApp();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) return <div className="py-16 text-center"><p className="font-semibold">This job doesn't exist.</p><Link to="/jobs" className="btn mt-4">Browse jobs</Link></div>;

  const company = companies.find((c) => c.id === job.companyId);
  const saved = isSaved(job.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_400px]">
      <article className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <CompanyLogo company={company} size="h-14 w-14" />
          <div>
            <h1 className="text-2xl font-extrabold">{job.title}</h1>
            <Link to={`/companies/${company.id}`} className="text-brand">{company.name}</Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="tag">{job.location}</span><span className="tag">{job.salary}</span>
          <span className="tag">{expLabel(job.experience)}</span><span className="tag">{job.type}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasApplied(job.id)
            ? <span className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">You've applied</span>
            : <Link to={`/jobs/${job.id}/apply`} className="btn">Apply now</Link>}
          <button className="btn-outline" onClick={() => toggleSave(job.id)}>{saved ? "Remove from saved" : "Save job"}</button>
        </div>
        <section><h2 className="mb-2 font-bold">About the role</h2><p className="text-slate-600">{job.description}</p></section>
        <section><h2 className="mb-2 font-bold">Required skills</h2><div className="flex flex-wrap gap-2">{job.skills.map((s) => <span key={s} className="tag">{s}</span>)}</div></section>
        <section><h2 className="mb-2 font-bold">Qualifications</h2><ul className="list-disc space-y-1 pl-5 text-slate-600">{job.qualifications.map((q) => <li key={q}>{q}</li>)}</ul></section>
      </article>
      <aside className="h-fit space-y-2 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold">About {company.name}</h2>
        <p className="text-sm text-slate-600">{company.about}</p>
        <p className="text-sm text-slate-500">{company.industry} · {company.size} employees</p>
        <Link to={`/companies/${company.id}`} className="btn-outline mt-2 w-full">View company</Link>
      </aside>
    </div>
  );
}
