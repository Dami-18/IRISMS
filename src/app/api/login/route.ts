"use server";

import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET || "secret_key";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    const jwtClaims = {
      uid,
    }; // store userId and username as jwtclaims with token

    const token = jwt.sign(jwtClaims, secretKey, {
      expiresIn: "3d",
    });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 3,
      path: "/",
      sameSite: "strict",
    });

    const response = NextResponse.json(
      { message: "Successfully logged in!" },
      { status: 200 }
    );

    // Set the cookie in the response header
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "we faileddd" },
      { status: 400 }
    );
  }
}
