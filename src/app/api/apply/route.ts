import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { projectId, studentId, email, sop } = await req.json();

    if (!projectId || !studentId || !email || !sop) {
      return NextResponse.json(
        { message: "Missing required fields", status: 400 },
        { status: 400 }
      );
    }

    const createApplication = await prisma.application.create({
      data: {
        sop: sop,
        user: {
          connect: {
            id: studentId,
          }
        },
        project: {
          connect: {
            id: projectId,
          }
        },
      },
    });

    // const updateAppliedStudentList = await prisma.project.update({
    //   where: {
    //     id: projectId,
    //   },
    //   data: {
    //     applications: {
    //       connect:{
    //         id: createApplication.id,
    //       }, // Push the student ID into the list of applied students
    //     },
    //   },
    // });

    // const updateUserApplications = await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     applications: {
    //       connect: {
    //         id: createApplication.id,
    //       },
    //     }
    //   },
    // });

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
