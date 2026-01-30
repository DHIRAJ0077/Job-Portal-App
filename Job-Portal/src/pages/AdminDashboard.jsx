import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const { token } = useAppContext();



// const handleStatusChange = async (id, status) => {
//   await fetch(
//     `http://localhost:5000/api/applications/admin/${id}/status`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status }),
//     }
//   );

//   fetchApplicants();
// };




  

  const [jobFormData, setJobFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "",
    description: "",
    responsibilities: "",
    skills: "",
  });

 const fetchApplicants = async () => {
  const res = await fetch(
    "http://localhost:5000/api/applications/admin/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  setApplicants(data);
};

useEffect(() => {
  if (activeTab === "applicants") {
    fetchApplicants();
  }
}, [activeTab]);


  

  useEffect(() => {
    if (activeTab === "applicants") {
      fetchApplicants();
    }
  }, [activeTab]);

  // ✅ POST JOB TO BACKEND
  const handleJobSubmit = async (e) => {
    e.preventDefault();

    const responsibilitiesArray = jobFormData.responsibilities
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const skillsArray = jobFormData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      setLoading(false);

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobFormData,
          responsibilities: responsibilitiesArray.join("\n"),
          skills: skillsArray.join(","),
        }),
      });

      if (!response.ok) {
        throw new Error("Job creation failed");
      }

      await fetchJobs();

      setJobFormData({
        title: "",
        company: "",
        location: "",
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        salary: "",
        description: "",
        responsibilities: "",
        skills: "",
      });

      setShowJobForm(false);
      alert("✅ Job posted successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to post job");
    } finally {
      setLoading(true);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  const handleStatusChange = (applicantId, newStatus) => {
    updateApplicationStatus(applicantId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "jobs"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Job Management
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "applicants"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Applicants ({applicants.length})
            </button>
          </div>
        </div>

        {/* Job Management Tab */}

        <div>
          {/* Header */}

          {activeTab === "jobs" && (
            <div>
              {/* Job Form */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Post a New Job
                </h3>

                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Job Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobFormData.title}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobFormData.company}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={jobFormData.location}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Salary Range *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., $100,000 - $130,000"
                        value={jobFormData.salary}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            salary: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Job Type *
                      </label>
                      <select
                        required
                        value={jobFormData.jobType}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            jobType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Experience Level *
                      </label>
                      <select
                        required
                        value={jobFormData.experienceLevel}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            experienceLevel: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="Entry-level">Entry-level</option>
                        <option value="Mid-level">Mid-level</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={jobFormData.description}
                      onChange={(e) =>
                        setJobFormData({
                          ...jobFormData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Responsibilities (one per line) *
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={jobFormData.responsibilities}
                      onChange={(e) =>
                        setJobFormData({
                          ...jobFormData,
                          responsibilities: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Skills (comma-separated) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="React, JavaScript, TypeScript"
                      value={jobFormData.skills}
                      onChange={(e) =>
                        setJobFormData({
                          ...jobFormData,
                          skills: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#13823a] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Post Job
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Jobs Table */}
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No jobs yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Posted Jobs
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Title</th>
                      <th className="px-6 py-3 text-left">Company</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Salary</th>
                      <th className="px-6 py-3 text-left">Created</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{job.title}</td>
                        <td className="px-6 py-4">{job.company}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">{job.salary}</td>
                        <td className="px-6 py-4">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Applicants Tab */}
        {activeTab === "applicants" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Applicants
            </h2>
            {applicants.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No applicants yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Job Applied
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Applied Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
<tbody>
  {applicants.map((app) => (
    <tr key={app.id}>
      <td className="px-6 py-4 font-medium">
        {app.user.name}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {app.user.email}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {app.job.title}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {new Date(app.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <select
          value={app.status}
          onChange={(e) =>
            handleStatusChange(app.id, e.target.value)
          }
          className="px-3 py-1 rounded-full text-xs font-semibold"
        >
          <option value="Pending">Pending</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>

                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
