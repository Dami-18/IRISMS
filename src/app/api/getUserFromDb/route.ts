"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  console.log(email);

  const user = await prisma.user.findUnique({
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

  return NextResponse.json({
    id: user?.id,
    uid: user?.uid,
    hashedPass: user?.password,
    message: "user found",
  });
}
