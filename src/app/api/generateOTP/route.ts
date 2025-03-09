"use server";

import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";
import crypto from "crypto";
import nodemailer from "nodemailer";

const redis = new Redis(6379, "localhost");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.usr,
    pass: process.env.pass,
  },
});

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("successfully set the otp:", otp, "for email", email);

    await redis.setex(email, 300, otp); // OTP valid for 5 minutes

    // await transporter.sendMail({
    //   from: process.env.usr,
    //   to: email,
    //   subject: "Your OTP Code",
    //   text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    // });

    console.log("email is senttttt");

    return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json(
      { message: "Error generating OTP" },
      { status: 500 }
    );
  }
}
