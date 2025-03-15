"use client";

// Comment out all the required in the inputs to get final submission form
import { useActionState, useState, useRef } from "react";
import Form from "next/form";
import { validationStud, verify } from "auth";
import Country from "@/../public/Country.json";
import Link from "next/link";

const CountryList = Country.map((obj) => {
  return obj.name;
});

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [ref, setRef] = useState<FormData | null>(null);
  const [otp, setOtp] = useState<string>("");

  const validationAction = async (previousState: any, formdata: FormData) => {
    const res = await validationStud(formdata, setShowModal);
    return res;
  };
  const [state, action] = useActionState(validationAction, undefined);

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <Form
        ref={formRef}
        action={action}
        className="max-w-3xl mx-auto my-10 bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          User Registration
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
                defaultValue={"fwehfw@kgpian.iitkgp.ac.in"}
                // required
                className="mt-1 pt-2 pb-2 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
              />
              {state?.errors?.email && (
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
              {state?.errors?.password && (
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
                defaultValue: "sam",
              },
              {
                id: "lastName",
                label: "Last Name",
                type: "text",
                defaultValue: "wilson",
              },
              {
                id: "contact",
                label: "Contact Number",
                type: "tel",
                defaultValue: "1245678912",
                pattern: "[0–9]{10}",
              },
              {
                id: "address",
                label: "Residential Address",
                type: "text",
                defaultValue: "address",
                autoComplete: "address",
              },
              {
                id: "city",
                label: "City",
                defaultValue: "address",
                type: "text",
                autoComplete: "address-level2",
              },
              {
                id: "state",
                label: "State / Province",
                defaultValue: "address",
                type: "text",
                autoComplete: "address-level1",
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
                  autoComplete={field.autoComplete || undefined}
                  defaultValue={field.defaultValue}
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

            <div>
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                defaultValue={"India"}
                className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
              >
                {CountryList.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Academic Information */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Academic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="degree" className={`block text-sm font-medium`}>
                Highest Degree
              </label>
              <select
                id="degree"
                name="degree"
                className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 sm:text-sm"
              >
                {[
                  "Bachelor's",
                  "Master's",
                  "Ph.D.",
                  "Diploma",
                  "Integrated Master's",
                  "Senior Secondary (10th)",
                  "Higher Secondary (12th)",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            {[
              {
                id: "gradYear",
                label: "Year of Graduation",
                type: "text",
                placeholder: "YYYY",
                defaultValue: "2200",
                pattern: "[0-9]{4}",
              },
              {
                id: "majors",
                label: "Majors",
                type: "text",
                defaultValue: "address",
              },
              {
                id: "insti",
                label: "Institution Name",
                type: "text",
                defaultValue: "address",
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
                  defaultValue={field.defaultValue}
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

            {/* File Uploads */}
            {["cv", "transcript"].map((doc) => (
              <div key={doc}>
                <label
                  htmlFor={doc}
                  className={`block text-sm font-medium capitalize`}
                >
                  {doc === `cv` ? `Upload CV/Resume` : `Upload Transcript`}
                </label>
                <input
                  id={doc}
                  name={doc}
                  type={`file`}
                  accept=".pdf,.docx,.doc"
                  // required
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className={`mt–6 flex items-center justify-end gap-x–4`}>
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
        {/* {console.log(formRef)} */}
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
                onClick={() => {
                  if (ref) verify(ref, otp);
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
