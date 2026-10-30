import CompanyCard from "../components/CompanyCard.jsx";
import { companies } from "../data/companies.js";

export default function Companies() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold">Companies</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{companies.map((c) => <CompanyCard key={c.id} company={c} />)}</div>
    </div>
  );
}
