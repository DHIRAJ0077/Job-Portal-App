import express from "express";
import prisma from "../models/prisma.js";
import authMiddleware from "../middleware/auth.js";

console.log("PRISMA MODELS:", Object.keys(prisma));

const router = express.Router();

/* ==========================
   GET PROFILE
========================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await prisma.jobProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

/* ==========================
   UPDATE PROFILE
========================== */
router.put("/", authMiddleware, async (req, res) => {
  try {
    const {
      phone = null,
      location = null,
      title = null,
      experienceYears = null,
      skills = [],              // ✅ DEFAULT EMPTY ARRAY
      resumeUrl = null,
      expectedSalary = null,
      jobType = null,
    } = req.body;

    const profile = await prisma.jobProfile.upsert({
      where: { userId: req.user.id },
      update: {
        phone,
        location,
        title,
        experienceYears,
        skills,                 // ✅ ALWAYS ARRAY
        resumeUrl,
        expectedSalary,
        jobType,
      },
      create: {
        userId: req.user.id,
        phone,
        location,
        title,
        experienceYears,
        skills,                 // ✅ ALWAYS ARRAY
        resumeUrl,
        expectedSalary,
        jobType,
      },
    });

    res.json(profile);
  } catch (err) {
    console.error("PROFILE UPSERT ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});



export default router;
