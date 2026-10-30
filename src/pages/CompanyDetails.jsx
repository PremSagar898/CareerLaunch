import { Link, useParams } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import JobCard from "../components/JobCard.jsx";
import { companies } from "../data/companies.js";
import { jobs } from "../data/jobs.js";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const company = companies.find((c) => c.id === companyId);
  if (!company) return <div className="py-16 text-center"><p className="font-semibold">This company doesn't exist.</p><Link to="/companies" className="btn mt-4">All companies</Link></div>;
  const openJobs = jobs.filter((j) => j.companyId === company.id);

  return (
    <div className="space-y-8">
      <section className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
        <CompanyLogo company={company} size="h-16 w-16" />
        <div>
          <h1 className="text-2xl font-extrabold">{company.name}</h1>
          <p className="text-sm text-slate-500">{company.industry} · {company.location} · {company.size} employees</p>
          <p className="mt-3 max-w-2xl text-slate-600">{company.about}</p>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">Open roles ({openJobs.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{openJobs.map((j) => <JobCard key={j.id} job={j} />)}</div>
      </section>
    </div>
  );
}
