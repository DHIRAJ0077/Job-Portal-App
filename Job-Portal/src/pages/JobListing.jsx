import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../components/JobCard";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    jobType: "",
    experienceLevel: "",
  });

  const [sortBy, setSortBy] = useState("latest");


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();

        const normalized = data.map((job) => ({
          ...job,
          skills: job.skills.split(",").map((s) => s.trim()),
        }));

        setJobs(normalized);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const locations = [...new Set(jobs.map((job) => job.location))];
  const jobTypes = ["Full-time", "Part-time", "Remote"];
  const experienceLevels = ["Entry-level", "Mid-level", "Senior"];

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const searchTerm = searchParams.get("search")?.toLowerCase() || "";

      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm),
        );

      const matchesLocation =
        !filters.location || job.location === filters.location;
      const matchesJobType =
        !filters.jobType || job.jobType === filters.jobType;
      const matchesExperience =
        !filters.experienceLevel ||
        job.experienceLevel === filters.experienceLevel;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience
      );
    });

    if (sortBy === "latest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    return filtered;
  }, [jobs, filters, sortBy, searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ location: "", jobType: "", experienceLevel: "" });
    setSortBy("latest");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Browse Jobs</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Filters */}
          <aside className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <select
              className="w-full mb-4 p-2 border rounded"
              value={filters.location}
              onChange={(e) =>
                handleFilterChange("location", e.target.value)
              }
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>

            <select
              className="w-full mb-4 p-2 border rounded"
              value={filters.experienceLevel}
              onChange={(e) =>
                handleFilterChange("experienceLevel", e.target.value)
              }
            >
              <option value="">All Levels</option>
              {experienceLevels.map((lvl) => (
                <option key={lvl}>{lvl}</option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="w-full bg-gray-200 py-2 rounded"
            >
              Clear Filters
            </button>
          </aside>

          {/* Jobs */}
          <main className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {filteredAndSortedJobs.length} Jobs Found
            </h2>

            {filteredAndSortedJobs.length === 0 ? (
              <p>No jobs found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAndSortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
