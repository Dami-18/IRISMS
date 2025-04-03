"use server";

import { verifyToken } from "auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await verifyToken(req);
  if (!res) return NextResponse.json({ message: "NOT FOUND" }, { status: 404 });
  if (res && res.uid[0] === "S")
    return NextResponse.json({ student: true }, { status: 200 });
  else if (res && res.uid[0] === "P")
    return NextResponse.json({ prof: true, status: 200 });
}
