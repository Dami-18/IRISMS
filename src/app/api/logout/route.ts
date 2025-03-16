import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // Immediately expire the cookie
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout server error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
