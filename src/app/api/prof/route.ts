// this api will fetch user details and then we will call on frontend to display user details on dashboard
import { verifyToken } from "@/../auth"; // probably we can move auth.ts in lib folder
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const profData = await verifyToken(req);

    if (!profData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const prof = await prisma.prof.findUnique({
      where: {
        uid: profData.uid,
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
  } catch (error) {
    NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
  // using above userData we fetch all the details of user from database and then send it as json
  // then further with this api call, all such details can be displayed on dahsboard or whatever
}
