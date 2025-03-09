import {
  SignupFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";
import { hash } from "bcrypt-ts";
import { redirect } from "next/navigation";

export async function signup(formState: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  let lol = null;
  const hashedPassword = await hash(password, 10);

  console.log(username);
  console.log(hashedPassword);
  console.log(email);

  // 3. Insert the user into the database or call an Auth Library's API
  // const data = await db
  //   .insert(users)
  //   .values({
  //     username,
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id });

  // const user = data[0];

  // if (!user) {
  //   return {
  //     message: "An error occurred while creating your account.",
  //   };
  // }
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

  localStorage.setItem("email", formData.get("email") as string);

  try {
    const res = await fetch("/api/generateOTP", {
      method: "POST",
      headers: { "Content-type": "/application/generateOTP" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
  } catch (error) {
    console.log(error);
  }

  redirect("/verify");
}

export async function verify(formData: FormData) {
  const obj = {
    method: "POST",
    headers: {
      "Content-type": "/application/verifyOTP",
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
