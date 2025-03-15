import {
  signupStudentFormSchema,
  signupProfFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";

import { hash, compare } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

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
  signupStud(validatedFields, formData);
}

async function signupStud(validatedFields: any, formData: FormData) {
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
      throw new Error("Failed to generate OTP");
    }
  } catch (error) {
    console.error(error);
    return { message: "Error during sign-in process" };
  }
}

// function for register of prof
export async function signupProf(formState: FormState, formData: FormData) {
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

  const fd = new FormData();
  fd.append("file", formData.get("cv") as File);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const { fileLink } = await res.json();

    if (!res.ok) {
      alert(`Upload failed`);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file.");
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);

  const data = {
    email: email,
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
    teachingExp: formData.get("exp"),
    researchExp: formData.get("researchExp"),
    researchInterns: formData.get("internchahiye"),
    cvUrl: formData.get("cv"), // need to handle this separately maybe in another api call for file uploads
  };

  const res = await fetch("/api/createFaculty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    localStorage.setItem("email", formData.get("email") as string);

    const res = await fetch("/api/generateOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to generate OTP");
    }

    // Redirect after successful OTP generation
    redirect("/verify");
  } catch (error) {
    console.error(error);

    // Re-throw redirection errors to allow Next.js to handle them
    if (isRedirectError(error)) {
      throw error;
    }

    return { message: "Error during sign-in process" };
  }
}

export async function signin(formState: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch("/api/getUserFromDb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
    }),
  });

  const { id, hashedPass } = await res.json();
  if (await compare(formData.get("password") as string, hashedPass)) {
    console.log("login successful");

    // for cookie and jwt from login api
    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const { message, status } = await res.json();
    if (status == 200) {
      redirect("/dashboard-students");
    } else {
      console.log(message);
      redirect("/login");
    }
  } else {
    console.log("invalid password!");
  }
}

export async function verify(formData: FormData, otp: string) {
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

  // do the user creation redirect whatever shit you wanna do
  if (res.status == 200) {
    const res = await fetch("/api/createStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: hashedPassword,
      }),
    });
  }
}

export async function verifyToken(req: NextApiRequest) {
  const token = req.cookies.token;

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
