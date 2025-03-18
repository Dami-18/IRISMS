import { verifyToken } from "auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await verifyToken(req);
    if (data?.uid[0] === "S")
      return NextResponse.json({ student: true }, { status: 200 });
    else if (data?.uid[0] === "P")
      return NextResponse.json(
        {
          student: false,
        },
        { status: 200 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
  return NextResponse.json({ message: "User Not Found" }, { status: 404 });
}
