import express from "express";
import prisma from "../models/prisma.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* ======================
   APPLY TO JOB
====================== */
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverNote } = req.body;

    const application = await prisma.application.create({
      data: {
        userId: req.user.id,
        jobId: Number(jobId),
        coverNote,
      },
    });

    res.status(201).json(application);
  } catch (err) {
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Already applied to this job" });
    }
    res.status(500).json({ message: "Failed to apply" });
  }
});

/* ======================
   USER APPLICATIONS
====================== */
router.get("/", authMiddleware, async (req, res) => {
  const apps = await prisma.application.findMany({
    where: { userId: req.user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(apps);
});


// ADMIN – get all applications with user + profile + job
router.get("/admin/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await prisma.application.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
});





router.patch("/admin/:id/status", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { status } = req.body;

  const updated = await prisma.application.update({
    where: { id: Number(req.params.id) },
    data: { status },
  });

  res.json(updated);
});






router.get("/check/:jobId", authMiddleware, async (req, res) => {
  const { jobId } = req.params;

  const existing = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: req.user.id,
        jobId: Number(jobId),
      },
    },
  });

  res.json({ applied: !!existing });
});






export default router;
