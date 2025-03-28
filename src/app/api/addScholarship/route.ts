import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      provider,
      amount,
      eligibility,
      duration,
      desc,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !provider ||
      !amount||
      !duration ||
      !desc ||
      !eligibility
    ) {
      return NextResponse.json(
        {
          message: "All fields are required!",
          missingFields: {
            name,
            provider,
            amount,
            duration,
            desc,
          },
        },
        { status: 400 }
      );
    }


    // Create a new project in the database
    const newScholarship = await prisma.scholarship.create({
      data: {
        name,
        provider,
        amount,
        eligibility,
        duration,
        desc,
      },
    });

    // Return success response with the created project details
    return NextResponse.json({
      message: "Project added successfully!",
      projectDetails: newScholarship,
    });
  } catch (error) {
    console.error("Error adding project:", error);

    let errorMessage = "An unexpected error occurred.";
    let statusCode = 500;

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
