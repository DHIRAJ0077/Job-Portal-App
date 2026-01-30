import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApplyJobModal from "../components/ApplyJobModal";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/applications/check/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setAlreadyApplied(data.applied);
      } catch (err) {
        console.error("Check applied failed", err);
      }
    };

    checkApplied();
  }, [id]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);

        if (!res.ok) {
          throw new Error("Job not found");
        }

        const data = await res.json();

        setJob({
          ...data,
          skills: data.skills.split(",").map((s) => s.trim()),
          responsibilities: data.responsibilities
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean),
        });
      } catch (error) {
        console.error(error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <button
            onClick={() => navigate("/browse-jobs")}
            className="bg-[#13823a] text-white px-6 py-3 rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const getJobTypeColor = (type) => {
    if (type === "Full-time") return "text-green-600";
    if (type === "Part-time") return "text-orange-600";
    if (type === "Remote") return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 mb-6 font-medium"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <span>{job.location}</span>
            <span className={getJobTypeColor(job.jobType)}>{job.jobType}</span>
            <span>{job.experienceLevel}</span>
            <span className="text-green-600 font-semibold">{job.salary}</span>
          </div>

          <button
            disabled={alreadyApplied}
            onClick={() => setShowModal(true)}
            className={`px-8 py-3 rounded-lg font-semibold ${
              alreadyApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#13823a] text-white hover:opacity-90"
            }`}
          >
            {alreadyApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p className="mb-6">{job.description}</p>

          <h3 className="text-xl font-semibold mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Job Details</h3>
          <p>
            <strong>Posted:</strong>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {showModal && (
        <ApplyJobModal job={job} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default JobDetails;
