"use client";

import { useRouter } from "next/navigation";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { signin } from "auth";
import Modal from "@/Components/Modal";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [toastId, setToastId] = useState<string>("");

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationAction = async (previousState: any, formData: FormData) => {
    const res = await signin(previousState, formData);
    return res;
  };

  const [state, action, pending] = useActionState(validationAction, undefined);

  useEffect(() => {
    if (pending) {
      const id = toast.loading("Signing in...");
      setToastId(id);
    } else if (toastId) {
      if (state?.errors || state?.invalid) {
        toast.error("Sign in failed. Please check your credentials.", {
          id: toastId,
        });
      } else if (state?.success) {
        toast.success("Signed in successfully!", { id: toastId });
        if (state.student === true) router.push("/dashboard-students");
        else if (state.student === false && state.admin === true)
          router.push("/admin-dashboard");
        else router.push("/dashboard-faculty");
      } else if (state?.registerFirst) {
        toast.error("Email not found, Register first", { id: toastId });
      }
      setToastId("");
    }
  }, [pending, state]);

  return (
    <>
      {/* Main container with background image */}
      <div className="min-h-screen flex items-center justify-center p-4 bg-[url('http://localhost:3000/assets/vecteezy_scholarship-application-document-contract-form-concept-with_11216133.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl flex">
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-1/2 p-10 bg-gradient-to-br from-yellow-50 to-yellow-200">
            {/* Logo */}
            <div className="mb-10">
              <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5">
                <span className="text-gray-800 font-medium">IRISMS</span>
              </div>
            </div>

            {/* Form Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Sign in to your account
            </h1>

            {/* Form */}
            <Form action={action} className="space-y-5">
              {/* Email Field */}
              <div>
                {state?.errors?.email && (
                  <p className="text-red-800 mb-1">{state.errors.email}</p>
                )}
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      // Eye-off icon (when password is visible)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      // Eye icon (when password is hidden)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Sign in Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-yellow-400 text-gray-800 rounded-md font-medium hover:bg-yellow-500 transition-colors"
              >
                Sign in
              </button>
            </Form>

            {/* Registration Button - Keeping original functionality */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a member?{" "}
              <button
                className="font-semibold text-yellow-600 hover:text-yellow-500"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Register
              </button>
            </p>
          </div>

          {/* Right Panel - Meeting Preview */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <img
              src="assets/rm373batch13-085.jpg"
              alt="Meeting Preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <Modal
          title="Select User Type"
          options={[
            {
              label: "Student",
              onClick: () => router.push("/register-students"),
            },
            {
              label: "Professor",
              onClick: () => router.push("/register-faculty"),
            },
          ]}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Login;
