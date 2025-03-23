import { NextRequest, NextResponse } from "next/server";
const path = require("path");
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cv = formData.get("cv") as File;

    if (!cv) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cvName = req.headers.get("X-Type");

    const cvBytes = await cv.arrayBuffer();
    const cvBuffer = Buffer.from(cvBytes);
    const cvFilePath = path.join(process.cwd(), "public/uploads/Prof/", cvName);

    await writeFile(cvFilePath, cvBuffer);

    const cvLink = "uploads/Prof/" + cvName;

    return NextResponse.json(
      { message: "file uploaded successfully", cvLink: cvLink },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
