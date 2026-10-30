import { Link } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";
import { jobs } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";

export default function SavedJobs() {
  const { savedIds } = useApp();
  const saved = jobs.filter((j) => savedIds.includes(j.id));
  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold">Saved jobs</h1>
      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <p className="font-semibold">You haven't saved any jobs yet.</p>
          <Link to="/jobs" className="btn mt-4">Browse jobs</Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{saved.map((j) => <JobCard key={j.id} job={j} />)}</div>
      )}
    </div>
  );
}
