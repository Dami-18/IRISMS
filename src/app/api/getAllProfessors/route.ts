"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

  try {
    const profs = await prisma.prof.findMany({ // fetch all the professors in database
      where: {

      },
    });

    if (profs.length == 0 ) {
      return NextResponse.json(
        { message: "No profs found", data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Projects retrieved successfully",
      data: profs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching projects" },
      { status: 500 }
    );
  }
}
