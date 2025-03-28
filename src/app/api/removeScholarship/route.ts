import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { schId } = await req.json();

    if (!schId) {
      return NextResponse.json(
        {
          message: "All fields are required!",
        },
        { status: 400 }
      );
    }

    // Delete related applications first
    await prisma.scholarshipApplication.deleteMany({
      // on doing this, send a mail, optional
      where: {
        scholarshipId: parseInt(schId),
      },
    });

    // Delete the project
    const deletedProject = await prisma.scholarship.delete({
      where: {
        id: parseInt(schId),
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
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
