"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id } = await req.json(); // send project id

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  
  if (!project) {
    return NextResponse.json({ message: "No project found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Details found in User table",
    data: project,
  });
}
