import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const ApplyJobModal = ({ job, onClose }) => {
  const { token, user } = useAppContext();

  const [coverNote, setCoverNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // SUBMIT APPLICATION
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `http://localhost:5000/api/applications/${job.id}`,
        { coverNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError("You have already applied for this job.");
      } else {
        setError("Failed to submit application.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUCCESS STATE
  // =========================
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600">
            Your application for <strong>{job.title}</strong> at{" "}
            <strong>{job.company}</strong> has been submitted.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // FORM
  // =========================
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Apply for {job.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">{job.company}</p>
          <p className="text-sm text-gray-600">
            Applying as {user.name} ({user.email})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Cover Note
            </label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              rows="5"
              placeholder="Why are you a good fit for this role?"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-5 py-2 bg-[#13823a] text-white rounded-lg"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
