import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Explicitly define the type for the data object
  // const userData: Prisma.UserCreateInput = {
  //   username,
  //   email,
  //   password,
  // };

  try {
    // ERROR SOLVED BY KRISH: npx prisma generate (if you're worried about the red underline error on the "data")
    const result = await prisma.user.create({
      // giving error in parsing connection string
      data: { email, password },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
