import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.usr,
    pass: process.env.pass,
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
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Create a calendar event with Google Meet link
    const obj = {
      calendarId: "primary",
      requestBody: {
        summary: "Interview Schedule",
        description: `Interview scheduled with ${email}`,
        start: {
          dateTime: `${date}T${time}:00`,
          timeZone: "Asia/Kolkata",
        },
        end: {
          //error in this upon entering 2 o clock cuz the time should be 03 but it's 3
          dateTime: `${date}T${parseInt(time.split(":")[0]) + 1}:00:00`,
          timeZone: "Asia/Kolkata",
        },
        attendees: [{ email }],
        conferenceData: {
          createRequest: { requestId: `meet-${Date.now()}` },
        },
      },
      conferenceDataVersion: 1,
    };

    console.log(obj);

    const eventResponse = await calendar.events.insert(obj);

    console.log(eventResponse);

    const meetingLink = eventResponse.data.hangoutLink;
    console.log(`Meeting Link Generated: ${meetingLink}`);

    // mail the google link to candidate
    // await transporter.sendMail({
    //   from: process.env.usr,
    //   to: email,
    //   subject: "Interview Schedule",
    //   text: `Greetings,

    //   Your interview has been scheduled as follows:

    //   - Date: ${date}
    //   - Time: ${time} (IST)
    //   - Meeting Link: ${meetingLink}

    //   Please ensure you have a stable internet connection and a quiet environment for the interview.

    //   If you have any questions, feel free to reply to this email.

    //   Regards,
    //   IRISMS
    //   `,
    // });

    return NextResponse.json(
      { message: "Sent meet link", meetingLink },
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
