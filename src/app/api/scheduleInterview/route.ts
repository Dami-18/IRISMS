import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_USR,
    pass: process.env.NEXT_PUBLIC_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email, date, time } = await req.json();

  if (!email || !date || !time) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const roomName = `interview-${email}`;
    const meetingLink = `https://meet.jit.si/${roomName}`;

    console.log(`Generated Jitsi Meet link: ${meetingLink}`);

    // mail the google link to candidate
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_USR,
      to: email,
      subject: "Interview Schedule",
      text: `Greetings,

      Your interview has been scheduled as follows:

      - Date: ${date}
      - Time: ${time} (IST)
      - Meeting Link: ${meetingLink}

      Please ensure you have a stable internet connection and a quiet environment for the interview.

      If you have any questions, feel free to reply to this email.

      Regards,
      IRISMS
      `,
    });

    return NextResponse.json(
      { message: "Sent meet link", roomName },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error scheduling interview:", err);
    return NextResponse.json(
      { message: "Failed to schedule interview" },
      { status: 500 }
    );
  }
}
