import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    location: "",
    title: "",
    experienceYears: "",
    skills: "",
    jobType: "",
    expectedSalary: "",
  });

  // -----------------------------
  // Fetch profile on load
  // -----------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setForm({
          phone: res.data.phone || "",
          location: res.data.location || "",
          title: res.data.title || "",
          experienceYears: res.data.experienceYears || "",
          skills: res.data.skills?.join(", ") || "",
          jobType: res.data.jobType || "",
          expectedSalary: res.data.expectedSalary || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Save profile
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        "http://localhost:5000/api/profile",
        {
          ...form,
          experienceYears: Number(form.experienceYears),
          expectedSalary: Number(form.expectedSalary),
          skills: form.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">My Job Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <Input
            label="Current Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            label="Experience (years)"
            name="experienceYears"
            type="number"
            value={form.experienceYears}
            onChange={handleChange}
          />
          <Input
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
          />
          <Input
            label="Preferred Job Type"
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
          />
          <Input
            label="Expected Salary"
            name="expectedSalary"
            type="number"
            value={form.expectedSalary}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#13823a] text-white px-6 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
    />
  </div>
);

export default Profile;
