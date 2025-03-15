"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Search in the `User` table first
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      uid: true,
      email: true,
      password: true,
    },
  });

  // If not found in `User`, search in the `Prof` table
  if (!user) {
    const prof = await prisma.prof.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        uid: true,
        email: true,
        password: true,
      },
    });

    if (prof) {
      return NextResponse.json({
        id: prof.id,
        uid: prof.uid,
        hashedPass: prof.password,
        message: "Details found in Prof table",
      });
    }

    // If not found in either table, return a 404 response
    return NextResponse.json({ message: "No user found in either table" }, { status: 404 });
  }

  // If found in `User`, return the details
  return NextResponse.json({
    id: user.id,
    uid: user.uid,
    hashedPass: user.password,
    message: "Details found in User table",
  });
}
