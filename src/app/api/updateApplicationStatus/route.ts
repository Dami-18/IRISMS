import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { applicationId, status } = await req.json();

  if (!applicationId || !status) {
    return NextResponse.json(
      { message: "Missing required fields: applicationId or status" },
      { status: 500 }
    );
  }

  // Validate status
  const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { message: "Invalid status value" },
      { status: 500 }
    );
  }

  try {
    // Update the application status in the database
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status: status }, // change to new state
      select: {
        user: true,
        project: true,
      },
    });

    if (status === "APPROVED") {
      //   await transporter.sendMail({
      //     from: process.env.usr,
      //     to: updatedApplication.user.email,
      //     subject: `Approval for ${updatedApplication.project.name}`,
      //     text: `Greetings ${updatedApplication.user.firstName} ${updatedApplication.user.lastName},
      // Congratulations! We are pleased to inform you that your application for the research internship, "${updatedApplication.project.name}," has been approved.
      // You have been selected to work under the guidance of ${updatedApplication.project.facultyName}. You will soon receive the offer letter after the PhD supervisor completes the document verification process.
      // Further details regarding your internship, including timelines and next steps, will be shared with you via email shortly. Should you have any questions in the meantime, feel free to reach out to irisms.portal@gmail.com.
      // Regards,
      // IRISMS`
      //   });
    } else {
      // await transporter.sendMail({
      //   from: process.env.usr,
      //   to: updatedApplication.user.email,
      //   subject: `Update on your application for ${updatedApplication.project.name}`,
      //   text: `Greetings ${updatedApplication.user.firstName} ${updatedApplication.user.lastName},
      //     Thank you for applying for the research internship, "${updatedApplication.project.name}," through IRISMS. After careful consideration, we regret to inform you that your application has not been approved at this time.
      //     We hope to see your application for future projects and internships available through IRISMS.
      //     If you have any questions or require further assistance, feel free to reach out to irisms.portal@gmail.com.
      //     Regards,
      //     IRISMS`,
      // });
    }

    return NextResponse.json(
      {
        message: "Application status updated successfully",
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
