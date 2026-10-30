import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);
export const STATUSES = ["Applied", "Under Review", "Shortlisted", "Rejected"];

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export function AppProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => load("cl_saved", []));
  const [applications, setApplications] = useState(() => load("cl_apps", []));
  const [candidate, setCandidate] = useState(() => load("cl_candidate", null));

  useEffect(() => localStorage.setItem("cl_saved", JSON.stringify(savedIds)), [savedIds]);
  useEffect(() => localStorage.setItem("cl_apps", JSON.stringify(applications)), [applications]);
  useEffect(() => localStorage.setItem("cl_candidate", JSON.stringify(candidate)), [candidate]);

  const isSaved = (id) => savedIds.includes(id);
  const toggleSave = (id) => setSavedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const hasApplied = (jobId) => applications.some((a) => a.jobId === jobId);

  const submitApplication = (jobId, form) => {
    setApplications((a) => [...a, { id: Date.now(), jobId, ...form, status: "Applied", date: new Date().toLocaleDateString() }]);
    setCandidate({ name: form.name, email: form.email, phone: form.phone, experience: form.experience, education: form.education });
  };
  const updateStatus = (id, status) => setApplications((a) => a.map((x) => (x.id === id ? { ...x, status } : x)));

  return (
    <AppContext.Provider value={{ savedIds, isSaved, toggleSave, applications, hasApplied, submitApplication, updateStatus, candidate }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
