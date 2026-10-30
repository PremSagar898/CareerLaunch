import { LOCATIONS, EXPERIENCE, TYPES } from "../data/jobs.js";

function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select className="input mt-1" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((o) => {
          const v = o.value ?? o;
          return <option key={v} value={v}>{o.label ?? o}</option>;
        })}
      </select>
    </label>
  );
}

export default function JobFilters({ filters, setFilter, clear }) {
  return (
    <aside className="h-fit space-y-4 md:sticky md:top-20 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-bold">Filters</h2>
      <Select label="Location" value={filters.location} onChange={(v) => setFilter("location", v)} options={LOCATIONS} />
      <Select label="Experience" value={filters.experience} onChange={(v) => setFilter("experience", v)} options={EXPERIENCE} />
      <Select label="Employment type" value={filters.type} onChange={(v) => setFilter("type", v)} options={TYPES} />
      <button className="btn-outline w-full" onClick={clear}>Clear filters</button>
    </aside>
  );
}
