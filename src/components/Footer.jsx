import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-4 sm:px-8 lg:px-12 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-slate-500">Find work you want, at companies that want you.</p>
        </div>
        <div className="flex gap-4 text-sm text-slate-600">
          <Link to="/jobs">Jobs</Link><Link to="/companies">Companies</Link><Link to="/dashboard">Dashboard</Link>
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} CareerLaunch</p>
      </div>
    </footer>
  );
}
