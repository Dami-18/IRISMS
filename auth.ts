import { SignupFormSchema, FormState } from "@/lib/definitions";
import { hash } from "bcrypt-ts";

export async function signup(formState: FormState, formData: FormData) {
  console.log(formData.get("username"));
  console.log(formData.get("email"));
  console.log(formData.get("password"));

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
  // Hash the user's password before storing it

  const hashedPassword = await hash(password, 10);
  console.log("ok")

  const res = await fetch("/api/register-student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      password: hashedPassword,
    })
  }
);


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
