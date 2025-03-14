import {
  signupStudentFormSchema,
  signupProfFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";

import { hash, compare } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function signupStud(formState: FormState, formData: FormData) {
  // this signup function is only for students currently, we need to make another for profs
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

  const { email, password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);
  console.log("ok");

  const res = await fetch("/api/createStudent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: hashedPassword,
    }),
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

// function for register of prof
export async function signupProf(formState: FormState, formData: FormData) {
  const validatedFields = signupProfFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);
  // console.log("ok");

  const data = {
    email: email,
    password: hashedPassword,
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    contact: formData.get("contact"),
    website: formData.get("website"),
    gscholar: formData.get("gscholar"),
    qualification: formData.get("highestDegree"),
    degreeYear: formData.get("gradYear"),
    specialization: formData.get("specialization"),
    institution: formData.get("institution"),
    teachingExp: formData.get("teachingExp"),
    researchExp: formData.get("researchExp"),
    researchInterns: formData.get("researchInterns"),
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

  const { hashedPass, uname } = await res.json();
  if (await compare(formData.get("password") as string, hashedPass)) {
    console.log("login successful");
    redirect("/dashboard-students"); // dynamic route created
    // here redirect after login, maybe store user id or username in cookies and then fetch his details on dashboard page
  } else {
    console.log("invalid password!");
  }
}

export async function verify(formData: FormData) {
  const obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem("email"),
      otp: formData.get("otp"),
    }),
  };
  const res = await fetch("/api/verifyOTP", obj);
  const { message, status } = await res.json();

  // do the user creation redirect whatever shit you wanna do
  if (status == 200) {
  }
}
