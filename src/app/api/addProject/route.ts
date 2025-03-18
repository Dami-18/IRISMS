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
      projectDesc,
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
      !prerequisites ||
      !projectDesc
    ) {
      return NextResponse.json(
        {
          message: "All fields are required!",
          missingFields: {
            name,
            topics,
            stipend,
            duration,
            mode,
            location,
            eligibility,
            prerequisites,
          },
        },
        { status: 400 }
      );
    }

    // Verify professor authentication
    const tmpData = await verifyToken(req);

    const profData = await prisma.prof.findUnique({
      where: {
        uid: tmpData?.uid,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
      },
    });

    if (!profData) {
      return NextResponse.json(
        { message: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    const facultyName = `${profData.firstName} ${profData.lastName}`;

    // Create a new project in the database
    const newProject = await prisma.project.create({
      data: {
        name,
        facultyName: facultyName,
        topics,
        stipend,
        duration,
        mode,
        location,
        eligibility,
        prerequisites,
        projectDesc,
        currentProf: {
          connect: { id: profData.id }, // one to one relationship
        },
      },
    });

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
      }
    }

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
