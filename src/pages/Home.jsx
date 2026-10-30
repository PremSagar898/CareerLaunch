import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { jobs } from "../data/jobs.js";
import { companies } from "../data/companies.js";

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const search = (e) => { e.preventDefault(); navigate(`/jobs?q=${encodeURIComponent(q)}`); };

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-ink px-6 py-14 text-white sm:px-12 lg:py-20">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Your next role is already hiring.</h1>
        <p className="mt-3 max-w-xl text-slate-300">Search {jobs.length} open roles across {companies.length} companies in Hyderabad, Bengaluru, Pune and Chennai.</p>
        <form onSubmit={search} className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row">
          <input className="input flex-1 text-ink" placeholder="Job title or company" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search jobs" />
          <button className="btn bg-blue-500 hover:bg-blue-600">Search jobs</button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured jobs</h2>
          <Link to="/jobs" className="text-sm font-semibold text-brand">See all jobs</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.filter((j) => j.featured).slice(0, 6).map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular companies</h2>
          <Link to="/companies" className="text-sm font-semibold text-brand">All companies</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      </section>
    </div>
  );
}
