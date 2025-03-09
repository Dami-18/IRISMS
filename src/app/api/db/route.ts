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
      email: true,
      password: true,
    },
  });

  return NextResponse.json({
    hashedPass: user?.password,
    message: "API CREATED SUCCESSFULLY",
  });
}
