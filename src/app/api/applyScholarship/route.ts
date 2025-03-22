import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { schoId, studentId, email } = await req.json();

    if (!schoId || !studentId || !email ) {
      return NextResponse.json(
        { message: "Missing required fields", status: 400 },
        { status: 400 }
      );
    }

    const createApplication = await prisma.scholarshipApplication.create({
      data: {
        user: {
          connect: {
            id: parseInt(studentId),
          },
        },
        scholarship: {
          connect: {
            id: parseInt(schoId),
          },
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
