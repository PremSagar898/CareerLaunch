import { companies } from "../data/companies.js";

const companyName = (id) => companies.find((c) => c.id === id)?.name ?? "";

// Every active filter must match (AND). An empty filter is ignored.
export function filterJobs(jobs, { q = "", location = "", experience = "", type = "" }) {
  const query = q.trim().toLowerCase();
  return jobs.filter((job) => {
    const matchesQuery = !query || job.title.toLowerCase().includes(query) || companyName(job.companyId).toLowerCase().includes(query);
    return matchesQuery
      && (!location || job.location === location)
      && (!experience || job.experience === experience)
      && (!type || job.type === type);
  });
}
