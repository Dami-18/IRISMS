"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const searchQuery = searchParams.get("search") || "";
  const stipendMin = parseInt(searchParams.get("stipendMin") || "0", 10);
  const stipendMax = parseInt(searchParams.get("stipendMax") || "50000", 10);
  const location = searchParams.get("location") || "";
  const durationMin = parseInt(searchParams.get("durationMin") || "0", 10);
  const durationMax = parseInt(searchParams.get("durationMax") || "12", 10);
  const remoteOnsite = searchParams.get("remoteOnsite");

  try {
    let projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { facultyName: { contains: searchQuery, mode: "insensitive" } },
          { location: { contains: searchQuery, mode: "insensitive" } },
          { topics: { has: searchQuery } },
        ],
      },
    });

    if (remoteOnsite === "onsite")
      projects = projects.filter((project) => project.mode === "onsite");
    else if (remoteOnsite === "remote")
      projects = projects.filter((project) => project.mode === "remote");
    projects = projects.filter(
      (project) =>
        parseInt(project.stipend) >= stipendMin &&
        parseInt(project.stipend) <= stipendMax
    );

    if (location) {
      projects = projects.filter((project) =>
        project.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    projects = projects.filter(
      (project) =>
        project.duration >= durationMin && project.duration <= durationMax
    );

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
