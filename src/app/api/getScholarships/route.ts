"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/../auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

  const res = await verifyToken(req)

  if(res?.uid == "admin") { // for admin user, uid will be set to admin while logging in 
    const scholarships = await prisma.scholarship.findMany({
        where: {
          // return all records
        },
      });
    
      if (!scholarships) {
        return NextResponse.json({ message: "No projects found" }, { status: 404 });
      }
    
      return NextResponse.json({
        message: "All scholarships successfully fetched",
        data: scholarships,
      });
  }

  else{
    return NextResponse.json({
        message: "Admin access required",
      },{status: 401});
  }
  
}