"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json(); 

    const scholarship = await prisma.scholarship.findUnique({
      where: {
        id: parseInt(id),
      },
      // include: {
      //   applications: {
      //     include: {
      //       user: true, // include explicitly to also return non scalar fields
      //       scholarship: true,
      //     },
      //   },
      // },
    });

    if (!scholarship) {
      return NextResponse.json(
        { message: "No project found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Details found in User table",
      data: scholarship,
    });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
