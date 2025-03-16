import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
  const { applicationId, status } = await req.json();


  if (!applicationId || !status) {
    return NextResponse.json({ message: "Missing required fields: applicationId or status" }, {status: 500});
  }

  // Validate status
  const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ message: "Invalid status value" }, {status: 500});
  }

  try {
    // Update the application status in the database
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status: status }, // change to new state
    });

    return NextResponse.json({
      message: "Application status updated successfully",
      application: updatedApplication,
    }, {status: 200});

  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ message: "Internal server error" }, {status: 500});
  }
}
