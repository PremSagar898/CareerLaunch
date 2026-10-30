import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Apply from "./pages/Apply.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Companies from "./pages/Companies.jsx";
import CompanyDetails from "./pages/CompanyDetails.jsx";

const NotFound = () => (
  <div className="py-20 text-center">
    <h1 className="text-2xl font-bold">Page not found</h1>
    <Link to="/" className="btn mt-4">Back to home</Link>
  </div>
);

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1920px] flex-1 px-4 sm:px-8 lg:px-12 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/jobs/:jobId/apply" element={<Apply />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:companyId" element={<CompanyDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
