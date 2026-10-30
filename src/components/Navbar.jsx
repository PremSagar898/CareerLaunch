import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { savedIds } = useApp();
  const links = [["/", "Home"], ["/jobs", "Jobs"], ["/companies", "Companies"], ["/saved", `Saved (${savedIds.length})`], ["/dashboard", "Dashboard"]];
  const cls = ({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-blue-50 text-brand" : "text-slate-600 hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-[1920px] items-center justify-between px-4 sm:px-8 lg:px-12 py-3">
        <Link to="/"><Logo /></Link>
        <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <div className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-slate-200 bg-white p-3 md:static md:flex md:w-auto md:flex-row md:border-0 md:p-0`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} className={cls} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
