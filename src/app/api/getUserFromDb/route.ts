"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      username: true,
    },
  });

  return NextResponse.json({
    id: user?.id,
    hashedPass: user?.password,
    uname: user?.username, // also return username to create dynamic route
    message: "user created successfully?",
  });
}
