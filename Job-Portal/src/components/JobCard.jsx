import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const getJobTypeColor = (type) => {
    switch (type) {
      case "Full-time":
        return "#4CAF50";
      case "Part-time":
        return "#FF9800";
      case "Remote":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  // ✅ Convert skills STRING → ARRAY safely
  let skillsArray = [];
  if (Array.isArray(job.skills)) {
    skillsArray = job.skills;
  } else if (typeof job.skills === "string") {
    skillsArray = job.skills.split(",").map((s) => s.trim());
  }


  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col gap-4 hover:-translate-y-1">
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-4">
          <span className="text-gray-600 text-sm">
            {job.location}
          </span>

          <span
            className="font-semibold text-sm"
            style={{ color: getJobTypeColor(job.jobType) }}
          >
            {job.jobType}
          </span>

          <span className="text-gray-600 text-sm">
            {job.experienceLevel}
          </span>
        </div>

        <div className="text-green-600 font-semibold">
          {job.salary}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
        {skillsArray.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}

        {skillsArray.length > 3 && (
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            +{skillsArray.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-gray-500 text-sm">
          Posted: {new Date(job.createdAt).toLocaleDateString()}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="bg-[#13823a] text-white px-5 py-2 rounded-lg font-medium text-sm transition-all hover:translate-x-1 hover:shadow-lg"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
