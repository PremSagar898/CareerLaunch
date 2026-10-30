import { Link } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import { companies } from "../data/companies.js";
import { useApp, STATUSES } from "../context/AppContext.jsx";

const COLORS = { Applied: "bg-blue-50 text-blue-700", "Under Review": "bg-amber-50 text-amber-700", Shortlisted: "bg-green-50 text-green-700", Rejected: "bg-red-50 text-red-700" };

export default function Dashboard() {
  const { candidate, applications, savedIds, updateStatus, toggleSave } = useApp();
  const jobOf = (id) => jobs.find((j) => j.id === id);
  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Candidate dashboard</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-3 font-bold">Your profile</h2>
        {candidate ? (
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-slate-500">Name</dt><dd className="font-semibold">{candidate.name}</dd></div>
            <div><dt className="text-slate-500">Email</dt><dd className="font-semibold">{candidate.email}</dd></div>
            <div><dt className="text-slate-500">Phone</dt><dd className="font-semibold">{candidate.phone}</dd></div>
            <div><dt className="text-slate-500">Education</dt><dd className="font-semibold">{candidate.education}</dd></div>
          </dl>
        ) : <p className="text-sm text-slate-500">Your profile is filled in after your first application.</p>}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Applied jobs ({applications.length})</h2>
        {applications.length === 0 ? (
          <p className="text-sm text-slate-500">No applications yet. <Link to="/jobs" className="font-semibold text-brand">Find a job to apply for.</Link></p>
        ) : (
          <div className="space-y-3">
            {applications.map((a) => {
              const job = jobOf(a.jobId);
              const company = companies.find((c) => c.id === job.companyId);
              return (
                <div key={a.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link to={`/jobs/${job.id}`} className="font-bold hover:text-brand">{job.title}</Link>
                    <p className="text-sm text-slate-500">{company.name} · Applied {a.date} · Resume: {a.resume}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${COLORS[a.status]}`}>{a.status}</span>
                    <select aria-label="Update status (demo)" className="input w-auto" value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-slate-400">The status dropdown simulates updates from employers, since there is no backend.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Saved jobs ({savedJobs.length})</h2>
        {savedJobs.length === 0 ? <p className="text-sm text-slate-500">Nothing saved yet.</p> : (
          <ul className="space-y-2">
            {savedJobs.map((j) => (
              <li key={j.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                <Link to={`/jobs/${j.id}`} className="font-semibold hover:text-brand">{j.title}</Link>
                <button className="text-sm text-slate-500 hover:text-red-600" onClick={() => toggleSave(j.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
