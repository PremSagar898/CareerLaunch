import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs, EXPERIENCE } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";

const INITIAL = { name: "", email: "", phone: "", experience: "", education: "", resume: "" };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(f.phone)) e.phone = "Enter a 10-digit phone number.";
  if (!f.experience) e.experience = "Select your experience.";
  if (f.education.trim().length < 2) e.education = "Enter your education.";
  if (!f.resume) e.resume = "Upload your resume (PDF or DOC).";
  return e;
}

export default function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { candidate, hasApplied, submitApplication } = useApp();
  const job = jobs.find((j) => j.id === jobId);
  const [form, setForm] = useState({ ...INITIAL, ...(candidate ?? {}) });
  const [errors, setErrors] = useState({});

  if (!job) return <p className="py-16 text-center font-semibold">This job doesn't exist.</p>;
  if (hasApplied(job.id)) return <div className="py-16 text-center"><p className="font-semibold">You've already applied to {job.title}.</p><Link to="/dashboard" className="btn mt-4">Go to dashboard</Link></div>;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onFile = (e) => {
    const file = e.target.files[0];
    if (file && !/\.(pdf|doc|docx)$/i.test(file.name)) { setErrors({ ...errors, resume: "Only PDF, DOC or DOCX files are allowed." }); return; }
    setForm({ ...form, resume: file?.name ?? "" });
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    submitApplication(job.id, form);
    navigate("/dashboard");
  };

  const Field = ({ id, label, children }) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      {children}
      {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-extrabold">Apply for {job.title}</h1>
      <Field id="name" label="Full name"><input id="name" className="input" value={form.name} onChange={set("name")} /></Field>
      <Field id="email" label="Email"><input id="email" type="email" className="input" value={form.email} onChange={set("email")} /></Field>
      <Field id="phone" label="Phone"><input id="phone" className="input" inputMode="numeric" value={form.phone} onChange={set("phone")} /></Field>
      <Field id="experience" label="Experience">
        <select id="experience" className="input" value={form.experience} onChange={set("experience")}>
          <option value="">Select</option>
          {EXPERIENCE.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
        </select>
      </Field>
      <Field id="education" label="Education"><input id="education" className="input" placeholder="e.g. B.Tech, Computer Science" value={form.education} onChange={set("education")} /></Field>
      <Field id="resume" label="Resume">
        <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={onFile} className="block w-full text-sm" />
        {form.resume && <p className="mt-1 text-sm text-slate-500">Selected: {form.resume}</p>}
      </Field>
      <div className="flex gap-3"><button className="btn">Submit application</button><Link to={`/jobs/${job.id}`} className="btn-outline">Cancel</Link></div>
    </form>
  );
}
