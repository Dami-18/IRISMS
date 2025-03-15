import { NextRequest, NextResponse } from "next/server";

const { google } = require("googleapis");
const path = require("path");
import fs from "fs";
import { writeFile } from "fs/promises";

const client_ID = process.env.client_ID;
const client_sec = process.env.client_sec;
const redirect_uri = process.env.redirect_uri;
const REEF = process.env.refresh_token;

const oauth2Client = new google.auth.OAuth2(
  client_ID,
  client_sec,
  redirect_uri
);

oauth2Client.setCredentials({ refresh_token: REEF });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function uploadFile(filePath: string, fileName: string) {
  try {
    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      },
    });

    const fileID = res.data.id;
    try {
      await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const result = await drive.files.get({
        fileId: fileID,
        fields: "webViewLink, webContentLink",
      });

      return NextResponse.json({
        fileLink: result.data.webViewLink,
        message: "success",
      });
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteFile(fileID: string) {
  try {
    const res = await drive.files.delete({
      fileId: fileID,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public/uploads", file.name);

    await writeFile(filePath, buffer);

    const res = await uploadFile(filePath, file.name);

    const { fileLink } = await res?.json();

    return NextResponse.json(
      { message: "file uploaded successfully", fileLink: fileLink },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
