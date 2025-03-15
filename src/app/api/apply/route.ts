import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { projectId, studentId, email } = await req.json();

    if (!projectId || !studentId || !email) {
      return NextResponse.json(
        { message: "Missing required fields", status: 400 },
        { status: 400 }
      );
    }

    const updateAppliedStudentList = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        students: {
          push: studentId, // Push the student ID into the list of applied students
        },
      },
    });

    const addInReview = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        inReview: { // currently this gives error because it is commented out in User schema
          push: projectId, // Push the project ID into the list of projects in review for the student
        },
      },
    });

    return NextResponse.json(
      { message: "Applied successfully", status: 200 },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred", status: 500 },
      { status: 500 }
    );
  } 
}
