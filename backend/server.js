import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./models/prisma.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import applicationRoutes from "./routes/applications.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const router = express.Router();


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationRoutes);


app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});


app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      description,
      responsibilities,
      skills,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        salary,
        jobType,
        experienceLevel,
        description,
        responsibilities,
        skills,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/jobs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    // 1️⃣ Delete related applications first
    await prisma.application.deleteMany({
      where: { jobId },
    });

    // 2️⃣ Then delete job
    await prisma.job.delete({
      where: { id: jobId },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});





// LOGIN





app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
