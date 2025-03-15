"use client";

// Comment out all the required in the inputs to get final submission form
import { useActionState } from "react";
import Form from "next/form";
import { signupProf } from "auth";
import Link from "next/link";

const Register = () => {
  const [state, action] = useActionState(signupProf, undefined);

  return (
    <Form
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
              // required
              className="mt-1 pt-2 pb-2 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none caret-indigo-600"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
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
            { id: "firstName", label: "First Name", type: "text" },
            { id: "lastName", label: "Last Name", type: "text" },
            { id: "contact", label: "Contact Number", type: "tel" },
            { id: "linkedin", label: "Personal Website/Linkedin", type: "url" },
            { id: "scholar", label: "Google Scholar Profile", type: "url" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
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
            },
            { id: "insti", label: "Institution Name", type: "text" },
            { id: "special", label: "Area of Specialization", type: "text" },
            {
              id: "teachingExp",
              label: "Total Teaching Experience (Years)",
              type: "number",
            },
            {
              id: "researchExp",
              label: "Total Research Experience (Years)",
              type: "number",
            },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className={`block text-sm font-medium`}>
                {field.label}
              </label>

              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder || undefined}
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
            type="submit"
            className="mt-16 ml-6 text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </section>
    </Form>
  );
};

export default Register;
