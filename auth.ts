import {
  signupStudentFormSchema,
  signupProfFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";

import { hash, compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET || "secret_key";

export async function validationStud(formData: FormData, setShowModal: any) {
  const validatedFields = signupStudentFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contact: formData.get("contact"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    gradYear: formData.get("gradYear"),
    majors: formData.get("majors"),
    insti: formData.get("insti"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  setShowModal(true);
  return signupStud(formData);
}

async function signupStud(formData: FormData) {
  try {
    const res = await fetch("/api/generateOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
      }),
    });

    console.log(await res.json());

    if (!res.ok) {
      return { ok: false };
    }
  } catch (error) {
    console.error(error);
  }
  return { ok: true };
}

export async function validationProf(formData: FormData, setShowModal: any) {
  const validatedFields = signupProfFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contact: formData.get("contact"),
    linkedin: formData.get("linkedin"),
    scholar: formData.get("scholar"),
    completeYear: formData.get("completeYear"),
    teachingExp: formData.get("teachingExp"),
    researchExp: formData.get("researchExp"),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  setShowModal(true);
  return signupProf(formData);
}

async function signupProf(formData: FormData) {
  const fd = new FormData();
  fd.append("file", formData.get("cv") as File);

  try {
    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   body: fd,
    // });
    // const { fileLink } = await res.json();
    // if (!res.ok) {
    //   alert(`Upload failed`);
    // }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file.");
  }

  try {
    const res = await fetch("/api/generateOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
      }),
    });

    if (!res.ok) {
      return { ok: false };
    }
  } catch (error) {
    console.error(error);
  }
  return { ok: true };
}

export async function signin(formState: FormState, formData: FormData) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(2000);
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // search in both tables
  const res = await fetch("/api/getDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
    }),
  });

  const { id, uid, hashedPass } = await res.json();
  if (await compare(formData.get("password") as string, hashedPass)) {
    console.log("login successful");

    // for cookie and jwt from login api
    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
        }),
      });

      console.log(await res.json(), res.status);

      if (res.status == 200) {
        // console.log(message);
        console.log("yayy");

        try {
          if (uid[0] == "S") {
            return { student: true, success: true };
          } else {
            return { student: false, success: true };
          }
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return { invalid: true };
  }
}

export async function verifyStud(formData: FormData, otp: string) {
  const obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      otp: otp,
    }),
  };

  const hashedPassword = await hash(formData.get("password") as string, 10);
  const res = await fetch("/api/verifyOTP", obj);

  if (res.status == 200) {
    try {
      const res = await fetch("/api/createStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: hashedPassword,
        }),
      });
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    return { success: true };
  }
}

export async function verifyProf(formData: FormData, otp: string) {
  const obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      otp: otp,
    }),
  };

  const hashedPassword = await hash(formData.get("password") as string, 10);
  const res = await fetch("/api/verifyOTP", obj);

  if (res.status == 200) {
    const data = {
      email: formData.get("email"),
      password: hashedPassword,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      contact: formData.get("contact"),
      website: formData.get("linkedin"),
      gscholar: formData.get("scholar"),
      qualification: formData.get("degree"),
      degreeYear: formData.get("completeYear"),
      specialization: formData.get("special"),
      institution: formData.get("insti"),
      teachingExp: formData.get("teachingExp"),
      researchExp: formData.get("researchExp"),
      researchInterns: formData.get("internchahiye"),
      // cvUrl: formData.get("cv"), // need to handle this separately maybe in another api call for file uploads
    };
    try {
      const res = await fetch("/api/createFaculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    return { success: true };
  }
}

export async function verifyToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === "object" && decoded !== null) {
      return decoded as jwt.JwtPayload; // Explicitly cast to JwtPayload to avoid TS errors
    }
  } catch (error) {
    console.error("JWT error", error);
    return null;
  }
}
