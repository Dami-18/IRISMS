"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const searchQuery = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";

  try {
    let projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { facultyName: { contains: searchQuery, mode: "insensitive" } },
          { location: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
    });

    if (location) {
      projects = projects.filter((project) =>
        project.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Return filtered results
    if (!projects || projects.length === 0) {
      return NextResponse.json(
        { message: "No projects found", data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching projects" },
      { status: 500 }
    );
  }
}
