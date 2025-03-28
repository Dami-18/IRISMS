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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('http://localhost:3000/assets/vecteezy_scholarship-application-document-contract-form-concept-with_11216133.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <Form
        ref={formRef}
        action={action}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl transition-all duration-1000 hover:shadow-2xl overflow-hidden"
      >
        {/* min-h-screen  */}
        <div className="bg-gradient-to-br to-indigo-50 from-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 animate-slideIn">
            Faculty Registration
          </h2>

          {/* Profile Information */}
          <section className="space-y-6 mb-8">
            <h3 className="text-xl font-semibold text-indigo-500 flex items-center mb-8">
              Profile Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-1000 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600"
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
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 transition-colors duration-1000"
                />
                {state && "errors" in state && state?.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-1000 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600"
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
                  className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 transition-colors duration-1000"
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
            <h3 className="text-xl font-semibold text-indigo-500 mb-6 flex items-center">
              Personal Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  id: "firstName",
                  label: "First Name",
                  type: "text",
                  d: "jibby",
                },
                {
                  id: "lastName",
                  label: "Last Name",
                  type: "text",
                  d: "jibby",
                },
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
                <div key={field.id} className="relative group">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    defaultValue={field.d}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border--500 focus:ring-2 focus:ring-indigo-500 transition-all duration-1000"
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
            <h3 className="text-xl font-semibold text-indigo-500 mb-6 flex items-center">
              Academic and Professional Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="degree" className={`block text-sm font-medium`}>
                  Educational Qualification
                </label>
                <select
                  id="degree"
                  name="degree"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border--500 focus:ring-2 focus:ring-indigo-500 transition-all duration-1000"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border--500 focus:ring-2 focus:ring-indigo-500 transition-all duration-1000"
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border--500 focus:ring-2 focus:ring-indigo-500 transition-all duration-1000"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border--500 focus:ring-2 focus:ring-indigo-500 transition-all duration-1000"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt–6 flex items-center justify-end gap-x–4">
              <Link
                type="button"
                href={"/"}
                className="mt-16 ml-6 text-m font-semibold text-black bg-red-300 px-4 py-2 rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                className="mt-16 ml-6 text-m font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </section>
        </div>
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
                className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none"
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
