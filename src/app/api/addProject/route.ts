import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/../auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      topics,
      stipend,
      duration,
      mode,
      location,
      eligibility,
      prerequisites,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !topics ||
      !stipend ||
      !duration ||
      !mode ||
      !location ||
      !eligibility ||
      !prerequisites
    ) {
      return NextResponse.json(
        { message: "All fields are required!", missingFields: { name, topics, stipend, duration, mode, location, eligibility, prerequisites } },
        { status: 400 }
      );
    }

    // Verify professor authentication
    const profData = await verifyToken(req);

    if (!profData) {
      return NextResponse.json({ message: "Unauthorized access. Please log in." }, { status: 401 });
    }

    // Create a new project in the database
    const newProject = await prisma.project.create({
      data: {
        name,
        topics,
        stipend,
        duration,
        mode,
        location,
        eligibility,
        prerequisites,
        students: [], // Initialize as empty array
        approved: [],
        rejected: [],
      },
    });

    // Fetch the latest project ID
    const lastProj = await prisma.project.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastProj) {
      throw new Error("Failed to retrieve the latest project.");
    }

    // Update professor's current projects list
    const updateProfProjects = await prisma.prof.update({
      where: {
        uid: profData.uid,
      },
      data: {
        currentProjects: {
          push: lastProj.id, // Push the project ID into the list of professor's current projects
        },
      },
    });

    if (!updateProfProjects) {
      throw new Error("Failed to update professor's project list.");
    }

    // Return success response with the created project details
    return NextResponse.json({
      message: "Project added successfully!",
      projectDetails: newProject,
    });

  } catch (error) {
    console.error("Error adding project:", error);

    let errorMessage = "An unexpected error occurred.";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;

      if (error.message.includes("Unauthorized")) {
        statusCode = 401;
      } else if (error.message.includes("Failed to retrieve the latest project")) {
        statusCode = 404;
        errorMessage = "Could not find the latest project.";
      } else if (error.message.includes("Failed to update professor's project list")) {
        statusCode = 500;
        errorMessage = "Could not update professor's project list.";
      }
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: statusCode }
    );
  }
}
