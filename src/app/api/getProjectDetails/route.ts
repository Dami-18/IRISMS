"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json(); // send project id

    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        applications: {
          include: {
            user: true,
            project: true, // include explicitly to also return non scalar fields
          },
        }, 
        currentProf: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "No project found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Details found in User table",
      data: project,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
