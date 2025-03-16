import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/../auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        {
          message: "All fields are required!",
        },
        { status: 400 }
      );
    }

    // Verify professor authentication
    const profData = await verifyToken(req);

    if (!profData) {
      return NextResponse.json(
        { message: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    // Delete related applications first
    await prisma.application.deleteMany({ // on doing this, send a mail, optional
      where: {
        projectId: projectId,
      },
    });

    // Delete the project
    const deletedProject = await prisma.project.delete({ 
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      {
        message: "Project and related applications deleted successfully",
        // project: deletedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Failed to delete project"},
      { status: 500 }
    );
  }
}
