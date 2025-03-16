// this api will fetch user details and then we will call on frontend to display user details on dashboard
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {uid} = await req.json();

    const prof = await prisma.prof.findUnique({
      where: {
        uid: uid,
      },
      include: {
        projectsCurrent: true, // This includes all related projects
      },
    });

    if (!prof) {
      return NextResponse.json({ message: "Prof not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Prof details fetched successfully",
        data: prof, // send whole user object
      },
      { status: 200 }
    );
  }
  catch(error){
    return NextResponse.json({error: "internal server error"}, {status: 500});
  }
}