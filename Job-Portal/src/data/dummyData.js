// Dummy data for the Job Portal

export const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salary: "$120,000 - $150,000",
    postedDate: "2026-01-20",
    description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building modern, responsive web applications using React and TypeScript.",
    responsibilities: [
      "Develop and maintain web applications using React",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Optimize applications for maximum speed and scalability"
    ],
    skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Git"],
    featured: true
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "$100,000 - $130,000",
    postedDate: "2026-01-22",
    description: "Join our backend team to build scalable APIs and microservices. Work with cutting-edge technologies in a fast-paced environment.",
    responsibilities: [
      "Design and develop RESTful APIs",
      "Work with databases and data modeling",
      "Implement authentication and authorization",
      "Write unit and integration tests",
      "Deploy and monitor services"
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS", "REST APIs"],
    featured: true
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    jobType: "Remote",
    experienceLevel: "Mid-level",
    salary: "$80,000 - $100,000",
    postedDate: "2026-01-25",
    description: "We're seeking a talented UX Designer to create intuitive and beautiful user experiences for our digital products.",
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research and testing",
      "Collaborate with product and engineering teams",
      "Design user interfaces and interactions",
      "Maintain design systems"
    ],
    skills: ["Figma", "User Research", "Prototyping", "UI/UX Design", "Design Systems"],
    featured: true
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salary: "$130,000 - $160,000",
    postedDate: "2026-01-18",
    description: "Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.",
    responsibilities: [
      "Manage AWS/GCP infrastructure",
      "Build and maintain CI/CD pipelines",
      "Monitor system performance",
      "Implement security best practices",
      "Automate deployment processes"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Linux"],
    featured: false
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Seattle, WA",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salary: "$140,000 - $170,000",
    postedDate: "2026-01-24",
    description: "Lead product strategy and execution for our SaaS platform. Work closely with engineering and design teams.",
    responsibilities: [
      "Define product roadmap and strategy",
      "Gather and prioritize requirements",
      "Work with cross-functional teams",
      "Analyze metrics and user feedback",
      "Launch new features and products"
    ],
    skills: ["Product Strategy", "Agile", "Analytics", "Stakeholder Management", "Roadmapping"],
    featured: false
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "GrowthCo",
    location: "Los Angeles, CA",
    jobType: "Part-time",
    experienceLevel: "Entry-level",
    salary: "$50,000 - $65,000",
    postedDate: "2026-01-26",
    description: "Join our marketing team to help grow our brand and reach new customers through digital marketing channels.",
    responsibilities: [
      "Create marketing campaigns",
      "Manage social media accounts",
      "Write blog posts and content",
      "Analyze marketing metrics",
      "Coordinate with external agencies"
    ],
    skills: ["Digital Marketing", "Social Media", "Content Writing", "SEO", "Analytics"],
    featured: false
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company: "StartupHub",
    location: "Remote",
    jobType: "Remote",
    experienceLevel: "Mid-level",
    salary: "$90,000 - $120,000",
    postedDate: "2026-01-23",
    description: "We need a Full Stack Developer who can work on both frontend and backend to build our platform.",
    responsibilities: [
      "Develop full-stack features",
      "Work with React and Node.js",
      "Design database schemas",
      "Implement API endpoints",
      "Deploy applications"
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "REST APIs"],
    featured: false
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    jobType: "Full-time",
    experienceLevel: "Senior",
    salary: "$125,000 - $155,000",
    postedDate: "2026-01-21",
    description: "Looking for a Data Scientist to analyze large datasets and build machine learning models.",
    responsibilities: [
      "Analyze complex datasets",
      "Build predictive models",
      "Create data visualizations",
      "Collaborate with business teams",
      "Present findings to stakeholders"
    ],
    skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow", "Data Visualization"],
    featured: false
  }
];

export const applications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2026-01-21",
    status: "Pending",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com"
  },
  {
    id: 2,
    jobId: 3,
    jobTitle: "UX Designer",
    company: "DesignStudio",
    appliedDate: "2026-01-26",
    status: "Shortlisted",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com"
  },
  {
    id: 3,
    jobId: 4,
    jobTitle: "DevOps Engineer",
    company: "CloudTech Solutions",
    appliedDate: "2026-01-19",
    status: "Rejected",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com"
  }
];

export const userProfile = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Experienced software developer with a passion for building modern web applications.",
  skills: ["React", "JavaScript", "TypeScript", "Node.js", "CSS"]
};

export const adminJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    postedDate: "2026-01-20",
    applicantsCount: 12,
    status: "Active"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    jobType: "Full-time",
    postedDate: "2026-01-22",
    applicantsCount: 8,
    status: "Active"
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    jobType: "Remote",
    postedDate: "2026-01-25",
    applicantsCount: 15,
    status: "Active"
  }
];

export const applicants = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    appliedDate: "2026-01-21",
    status: "Pending"
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    name: "Mike Johnson",
    email: "mike.j@email.com",
    appliedDate: "2026-01-22",
    status: "Shortlisted"
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: "Backend Engineer",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    appliedDate: "2026-01-23",
    status: "Pending"
  },
  {
    id: 4,
    jobId: 3,
    jobTitle: "UX Designer",
    name: "John Doe",
    email: "john.doe@email.com",
    appliedDate: "2026-01-26",
    status: "Shortlisted"
  }
];
