"use client";

// Comment out all the required in the inputs to get final submission form
import { useActionState, useEffect, useRef, useState } from "react";
import Form from "next/form";
import { validationProf, verifyProf } from "auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [ref, setRef] = useState<FormData | null>(null);
  const [otp, setOtp] = useState<string>("");

  const validationAction = async (previousState: any, formdata: FormData) => {
    const res = await validationProf(formdata, setShowModal);
    return res;
  };
  const [state, action, pending] = useActionState(validationAction, undefined);

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  const [toastId, setToastId] = useState<string>("");

  useEffect(() => {
    if (pending) {
      const id = toast.loading("Loading ...");
      setToastId(id);
    } else if (toastId) {
      if (state)
        if ("errors" in state) {
          toast.error("Registration failed. Please check your credentials.", {
            id: toastId,
          });
        } else if ("ok" in state) {
          if (!state.ok)
            toast.error("Error while sending the OTP!", { id: toastId });
          else toast.success("OTP sent successfully!", { id: toastId });
        }
      setToastId("");
    }
  }, [pending, state]);

  return (
    <div className="relative">
      <Form
        ref={formRef}
        action={action}
        className="max-w-3xl mx-auto my-10 bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Faculty Registration
        </h2>

        {/* Profile Information */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue="debais@iitkgp.ac.in"
                // required
                className="mt-1 pt-2 pb-2 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
              />
              {state && "errors" in state && state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                defaultValue="hello123@"
                // required
                autoComplete="new-password"
                className="mt-1 pt-2 pb-2 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
              />
              {state && "errors" in state && state?.errors?.password && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {[
              {
                id: "firstName",
                label: "First Name",
                type: "text",
                d: "jibby",
              },
              { id: "lastName", label: "Last Name", type: "text", d: "jibby" },
              {
                id: "contact",
                label: "Contact Number",
                type: "tel",
                d: "9321144145",
              },
              {
                id: "linkedin",
                label: "Personal Website/Linkedin",
                type: "url",
                d: "https://hello.com",
              },
              {
                id: "scholar",
                label: "Google Scholar Profile",
                type: "url",
                d: "https://hello.com",
              },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  defaultValue={field.d}
                  className="mt-1 pt-2 pb-2 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
                />
                {/*@ts-ignore*/}
                {state?.errors?.[field.id] && (
                  <p className="mt-1 text-sm text-red-600">
                    {/*@ts-ignore*/}
                    {state.errors[field.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Academic Information */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Academic and Professional Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="degree" className={`block text-sm font-medium`}>
                Educational Qualification
              </label>
              <select
                id="degree"
                name="degree"
                className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 sm:text-sm"
              >
                {["Master's", "Ph.D.", "Post Doctorial Fellowship"].map(
                  (option) => (
                    <option key={option}>{option}</option>
                  )
                )}
              </select>
            </div>
            {[
              {
                id: "completeYear",
                label: "Year of Degree Completion",
                type: "text",
                placeholder: "YYYY",
                d: "2005",
              },
              {
                id: "insti",
                label: "Institution Name",
                type: "text",
                d: "jibby",
              },
              {
                id: "special",
                label: "Area of Specialization",
                type: "text",
                d: "jibby",
              },
              {
                id: "teachingExp",
                label: "Total Teaching Experience (Years)",
                type: "number",
                d: "123",
              },
              {
                id: "researchExp",
                label: "Total Research Experience (Years)",
                type: "number",
                d: "12",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className={`block text-sm font-medium`}
                >
                  {field.label}
                </label>

                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder || undefined}
                  defaultValue={field.d}
                  // required
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 text-sm"
                />
                {/*@ts-ignore*/}
                {state?.errors?.[field.id] && (
                  <p className="mt-1 text-sm text-red-600">
                    {/*@ts-ignore*/}
                    {state.errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label
                htmlFor="internchahiye"
                className={`block text-sm font-medium`}
              >
                Are you looking for research interns?
              </label>
              <select
                id="internchahiye"
                name="internchahiye"
                defaultValue="Yes"
                className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 sm:text-sm"
              >
                {["No", "Yes", "Maybe / Not Sure"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* File Uploads */}
            {["cv"].map((doc) => (
              <div key={doc}>
                <label
                  htmlFor={doc}
                  className={`block text-sm font-medium capitalize`}
                >
                  {"Upload CV/Resume"}
                </label>
                <input
                  id={doc}
                  name={doc}
                  type={`file`}
                  accept=".pdf"
                  // required
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt–6 flex items-center justify-end gap-x–4">
            <Link
              type="button"
              href={"/"}
              className="mt-16 text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </Link>

            {/* Register Button */}
            <button
              onClick={() => {
                if (formRef.current) {
                  const fd = new FormData(formRef.current);
                  setRef(fd);
                }
              }}
              type="submit"
              className="mt-16 ml-6 text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </section>
      </Form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
            <input
              type="text"
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="text-sm text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  if (ref) {
                    const res = await verifyProf(ref, otp);
                    if (res?.success) {
                      toast.success("Registered Successfully");
                      redirect("/login");
                    } else {
                      toast.error("Invalid OTP ");
                    }
                  }
                }}
                className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Submit OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
