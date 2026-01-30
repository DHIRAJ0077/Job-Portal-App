import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);


  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-[#13823a] text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl mb-10 opacity-95">
            Discover thousands of job opportunities from top companies worldwide
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl shadow-2xl">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="flex-1 border-none px-4 py-3 text-gray-900 rounded-lg outline-none text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 border-none px-4 py-3 text-gray-900 rounded-lg outline-none text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#13823a] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform whitespace-nowrap"
              >
                Search Jobs
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all"
              onClick={() => navigate("/jobs")}
            >
              Browse All Jobs
            </button>
            <button
              className="bg-white/20 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all"
              onClick={() => navigate("/admin")}
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked opportunities from top employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <button
              className="bg-[#13823a] text-white px-8 py-3 rounded-lg font-semibold hover:translate-x-2 hover:shadow-xl transition-all"
              onClick={() => navigate("/jobs")}
            >
              View All Jobs →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
