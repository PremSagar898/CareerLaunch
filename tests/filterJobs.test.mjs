import assert from "node:assert/strict";
import { jobs } from "../src/data/jobs.js";
import { filterJobs } from "../src/utils/filterJobs.js";

const ids = (f) => filterJobs(jobs, f).map((j) => j.id).sort();

// AI challenge: Hyderabad + 1–3 years + Full-time
const combo = filterJobs(jobs, { location: "Hyderabad", experience: "1-3", type: "Full-time" });
assert.deepEqual(combo.map((j) => j.title).sort(), ["Data Analyst", "Frontend Developer"]);
assert.ok(combo.every((j) => j.location === "Hyderabad" && j.experience === "1-3" && j.type === "Full-time"));

// Each single filter alone returns a superset of the combined result
assert.ok(ids({ location: "Hyderabad" }).length > combo.length);
assert.ok(ids({ experience: "1-3" }).length > combo.length);
assert.ok(ids({ type: "Full-time" }).length > combo.length);

// Two filters: Hyderabad + 1–3 years includes the Contract job, three filters excludes it
assert.ok(ids({ location: "Hyderabad", experience: "1-3" }).includes("5"));
assert.ok(!ids({ location: "Hyderabad", experience: "1-3", type: "Full-time" }).includes("5"));

// Search by title / company, plus filters
assert.deepEqual(ids({ q: "technova" }), ["1", "5"]);
assert.deepEqual(ids({ q: "technova", type: "Contract" }), ["5"]);
assert.deepEqual(ids({ q: "REACT" }), ["5"]); // title/company only, not skills

// No match, and cleared filters return everything
assert.equal(filterJobs(jobs, { location: "Pune", type: "Internship" }).length, 0);
assert.equal(filterJobs(jobs, {}).length, jobs.length);
console.log("All filter tests passed (" + combo.length + " jobs match Hyderabad + 1–3 years + Full-time).");
