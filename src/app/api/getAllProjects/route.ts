"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

  // currently kept only 2 filters, later will add other filters also
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('search') || '';
  const locationFilter = searchParams.get('location') || '';


  // maybe can optimize this, use fuzzy search also if possible
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { facultyName: { contains: searchQuery, mode: 'insensitive' } },
        { location: { contains: searchQuery, mode: 'insensitive' } }
      ],
      ...(locationFilter && { location: locationFilter }),
    },
  });

  
  if (!projects) {
    return NextResponse.json({ message: "No projects found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Details found in User table",
    data: projects,
  });
}