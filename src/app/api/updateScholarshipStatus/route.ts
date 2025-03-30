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
    const updatedApplication = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: { status: status }, // change to new state
      select: {
        user: true,
        scholarship: true,
      },
    });

    if (status === "APPROVED") {
      //   await transporter.sendMail({
      //     from: process.env.usr,
      //     to: updatedApplication.user.email,
      //     subject: `Approval for ${updatedApplication.scholarship.name}`,
      //     text: `Greetings ${updatedApplication.user.firstName} ${updatedApplication.user.lastName},
      // Congratulations! We are pleased to inform you that your application for the scholarship, "${updatedApplication.scholarship.name}," has been approved.
      // As part of the scholarship disbursement process, please ensure that your bank account details are updated in the portal to facilitate the transfer of funds. The scholarship amount will be credited to your account once the organization completes the document verification process.
      // Regards,
      // IRISMS`
      //   });
    } else {
      // await transporter.sendMail({
      //   from: process.env.usr,
      //   to: updatedApplication.user.email,
      //   subject: `Update on your application for ${updatedApplication.scholarship.name}`,
      //   text: `Greetings ${updatedApplication.user.firstName} ${updatedApplication.user.lastName},
      //     Thank you for applying for the scholarship, "${updatedApplication.scholarship.name}," through IRISMS. After a thorough review of your application, we regret to inform you that it has not been approved at this time.
      //     We hope to see your application for future projects and internships available through IRISMS.
      //     If you have any questions or require further assistance, feel free to reach out to irisms.portal@gmail.com.
      //     Regards,
      //     IRISMS`
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
