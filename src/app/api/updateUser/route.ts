"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json(); // Parse incoming JSON data

    const updatedUser = await prisma.user.update({
      where: { email: body.email }, // Use email as identifier (assuming it's unique)
      data: {
        contact: body.contact,
        address: body.address,
        city: body.city,
        state: body.state,
        country: body.country,
        cvUrl: body.cvUrl,
        transcriptUrl: body.transcriptUrl,
        incomeProof: body.incomeProof,
      },
    });

    return NextResponse.json({
      message: "User profile updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Failed to update user profile." },
      { status: 500 }
    );
  }
}
