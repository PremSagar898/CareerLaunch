import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";
import JobFilters from "../components/JobFilters.jsx";
import { jobs } from "../data/jobs.js";
import { filterJobs } from "../utils/filterJobs.js";

const EMPTY = { location: "", experience: "", type: "" };

export default function Jobs() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState(EMPTY);

  const results = filterJobs(jobs, { q, ...filters });
  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const clear = () => { setFilters(EMPTY); setQ(""); };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold">Find jobs</h1>
      <input className="input mb-6 max-w-xl" placeholder="Search by job title or company" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search jobs" />
      <div className="grid gap-6 md:grid-cols-[220px_1fr] xl:grid-cols-[280px_1fr]">
        <JobFilters filters={filters} setFilter={setFilter} clear={clear} />
        <section>
          <p className="mb-3 text-sm text-slate-500">{results.length} {results.length === 1 ? "job" : "jobs"} found</p>
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <p className="font-semibold">No jobs match these filters.</p>
              <button className="btn mt-4" onClick={clear}>Clear filters</button>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{results.map((j) => <JobCard key={j.id} job={j} />)}</div>
          )}
        </section>
      </div>
    </div>
  );
}
