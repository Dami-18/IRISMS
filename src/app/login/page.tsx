// Login Page
"use client";

import { useRouter } from "next/navigation";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { signin } from "auth";
import Modal from "@/Components/Modal"; // Import the Modal component
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [toastId, setToastId] = useState<string>("");
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
        else if(state.student === false && state.admin === true) router.push("/admin-dashboard");
        else router.push("/dashboard-faculty");
        
      } else if (state?.registerFirst) {
        toast.error("Email not found, Register first", { id: toastId });
      }
      setToastId("");
    }
  }, [pending, state]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form action={action} className="space-y-6">
            <div>
              {/*change the error style create a modal or something for it*/}
              {state?.errors?.email && (
                <p className="text-red-800">{state.errors.email}</p>
              )}
              <label htmlFor="email" className="block text-sm/6 font-medium ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  // type="email"
                  required
                  autoComplete="email"
                  defaultValue="okthisisit@kgpian.iitkgp.ac.in"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  defaultValue="hello123@"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <button
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Register
            </button>
          </p>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Register As:"
          options={[
            {
              label: "Student",
              onClick: () => {
                setShowModal(false);
                router.push("/register-students");
              },
            },
            {
              label: "Professor",
              onClick: () => {
                setShowModal(false);
                router.push("/register-faculty");
              },
            },
          ]}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Login;
