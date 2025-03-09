import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(6379, "localhost");

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  try {
    const storedOtp = await redis.get(email);
    if (!storedOtp) {
      return NextResponse.json(
        { message: "OTP expired or not found" },
        { status: 404 }
      );
    }

    // both type should be string
    if (storedOtp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    await redis.del(email);
    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Error verifying OTP" },
      { status: 500 }
    );
  }
}
