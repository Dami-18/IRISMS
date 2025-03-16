import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {
    email,
    password,
    firstName,
    lastName,
    contact,
    website,
    gscholar,
    qualification,
    degreeYear,
    specialization,
    institution,
    teachingExp,
    researchExp,
    researchInterns,
    cvUrl,
  } = await req.json();

  try {
    const lastProf = await prisma.prof.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    let profUid = null;
    if (!lastProf) {
      profUid = "P" + "1";
    } else {
      profUid = "P" + (lastProf.id + 1).toString(); // creating uid for newly added prof
    }

    const result = await prisma.prof.create({
      data: {
        email,
        password,
        uid: profUid,
        firstName,
        lastName,
        contact,
        website,
        gscholar,
        qualification,
        degreeYear,
        specialization,
        institution,
        teachingExp: parseFloat(teachingExp),
        researchExp: parseFloat(researchExp),
        researchInterns,
        cvUrl,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create prof" },
      { status: 500 }
    );
  }
}
