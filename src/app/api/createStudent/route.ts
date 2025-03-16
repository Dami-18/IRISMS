import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const redis = new Redis(6379, "localhost");

export async function POST(req: NextRequest) {
  const { 
    email, 
    password,
    firstName, // will have to check these all fields from the mapping of names with html elements
    lastName,
    contact,
    address,
    city,
    state,
    country,
    degree,
    gradYear,
    major,
    institution,
    cvUrl,
    transcriptUrl,
   } = await req.json();

  const lastStud = await prisma.user.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  let studUid = null
  if (!lastStud) {
    console.log('The table is empty.');
    studUid = "S" + "1"
  } else {
    console.log('Latest record:', lastStud);
    studUid = "S" + (lastStud.id + 1).toString() // creating uid for newly added prof
  }

  try {
    // ERROR SOLVED BY KRISH: npx prisma generate (if you're worried about the red underline error on the "data")
    // npx prisma migrate dev --name init
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    const result = await prisma.user.create({
      data: { 
        email, 
        password, 
        uid: studUid,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        address: address,
        city: city,
        state: state,
        country: country,
        degree: degree,
        gradYear: gradYear,
        major: major,
        institution: institution,
        cvUrl: cvUrl,
        transcriptUrl: transcriptUrl,
       },
    });
    await redis.del(email);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
