import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAppContext();

  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // =============================
  // Fetch profile
  // =============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  // =============================
  // Fetch applications
  // =============================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingApps(false);
      }
    };

    fetchApplications();
  }, [token]);

  // =============================
  // Profile completion check
  // =============================
  const isProfileComplete =
    profile?.phone &&
    profile?.location &&
    profile?.title &&
    profile?.experienceYears &&
    profile?.skills?.length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shortlisted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Dashboard</h1>

        {/* 🚨 Profile Incomplete Banner */}
        {!isProfileComplete && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center">
            <p className="text-yellow-800 font-medium">
              Complete your job profile to get better job matches 🚀
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-[#13823a] text-white px-4 py-2 rounded-lg"
            >
              Complete Profile
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ================= PROFILE CARD ================= */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            <div className="space-y-3">
              <ProfileRow label="Name" value={user.name} />
              <ProfileRow label="Email" value={user.email} />
              <ProfileRow label="Phone" value={profile?.phone || "Not added"} />
              <ProfileRow
                label="Location"
                value={profile?.location || "Not added"}
              />
              <ProfileRow
                label="Job Title"
                value={profile?.title || "Not added"}
              />
              <ProfileRow
                label="Experience"
                value={
                  profile?.experienceYears
                    ? `${profile.experienceYears} years`
                    : "Not added"
                }
              />
              <ProfileRow
                label="Expected Salary"
                value={
                  profile?.expectedSalary
                    ? `₹${profile.expectedSalary}`
                    : "Not added"
                }
              />
              <ProfileRow
                label="Job Type"
                value={profile?.jobType || "Not added"}
              />

              <div>
                <p className="text-sm text-gray-600 mb-1">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.skills?.length ? (
                    profile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No skills added
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= APPLICATIONS ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <button
                onClick={() => navigate("/jobs")}
                className="bg-[#13823a] text-white px-4 py-2 rounded-lg"
              >
                Browse Jobs
              </button>
            </div>

            {loadingApps ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : applications.length === 0 ? (
              <div className="text-center py-10 text-gray-600">
                You haven’t applied to any jobs yet.
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {app.job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {app.job.company}
                      </p>
                      <p className="text-xs text-gray-400">
                        Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Stat title="Applications" value={applications.length} />
          <Stat
            title="Pending"
            value={applications.filter((a) => a.status === "Pending").length}
          />
          <Stat
            title="Shortlisted"
            value={
              applications.filter((a) => a.status === "Shortlisted").length
            }
          />
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <div className="text-3xl font-bold text-indigo-600">{value}</div>
    <div className="text-gray-600">{title}</div>
  </div>
);

export default Dashboard;
