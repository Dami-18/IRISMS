"use server";

// this api will fetch user details and then we will call on frontend to display user details on dashboard
import { verifyToken } from "@/../auth"; // probably we can move auth.ts in lib folder
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userData = await verifyToken(req);

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      uid: userData.uid,
    },
    include: {
      applications: {
        include: {
          user: true,
          project: true, // include explicitly to also return non scalar fields
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    {
      message: "User details fetched successfully",
      data: user, // send whole user object
    },
    { status: 200 }
  );
  // using above userData we fetch all the details of user from database and then send it as json
  // then further with this api call, all such details can be displayed on dahsboard or whatever
}

// 2 methods just to debug in case one doesn't work
export async function POST(req: NextRequest) {
  const userData = await verifyToken(req);

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      uid: userData.uid,
    },
    include: {
      applications: {
        include: {
          user: true,
          project: true, // include explicitly to also return non scalar fields
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    {
      message: "User details fetched successfully",
      data: user, // send whole user object
    },
    { status: 200 }
  );
  // using above userData we fetch all the details of user from database and then send it as json
  // then further with this api call, all such details can be displayed on dahsboard or whatever
}
