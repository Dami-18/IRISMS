// Register Page
"use client";
import { useActionState, useState } from "react";
import Form from "next/form";
import { signupProf } from "auth";

const Register = () => {
  const [state, action, pending] = useActionState(signupProf, undefined);
  return (
    <Form action={action}>
      <div className="space-y-12 p-20">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600"></p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  defaultValue="fqkf2j3!31S"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/*change the error style create a modal or something for it*/}
              {state?.errors?.password && (
                <p className="text-red-800">{state.errors.password}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  defaultValue="feijfiwj2ga@gkakcp.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="contact" className="block text-sm/6 font-medium">
                Contact number
              </label>
              <div className="mt-2">
                <input
                  id="contact"
                  name="contact"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="website" className="block text-sm/6 font-medium">
                Personal Website/Linkedin
              </label>
              <div className="mt-2">
                <input
                  id="website"
                  name="website"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gscholar" className="block text-sm/6 font-medium">
                Google Scholar Profile
              </label>
              <div className="mt-2">
                <input
                  id="gscholar"
                  name="gscholar"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {state?.errors?.email && (
              <p className="text-red-800">{state.errors.email}</p>
            )}
          </div>
        </div>

        {/* Academic info, here user will also upload CV and transcript */}

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold">
            Academic and Professional Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Provide details of your educational qualifications, teaching
            experience, research activities, and professional achievements.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="highestDegree"
                className="block text-sm/6 font-medium"
              >
                Educational Qualification
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="highestDegree"
                  name="highestDegree"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Ph.D.</option>
                  <option>Master's</option>
                  <option>Postdoctoral Fellowship</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="degreeYear"
                className="block text-sm/6 font-medium"
              >
                Year of Degree Completion
              </label>
              <div className="mt-2">
                <input
                  id="gradYear"
                  name="gradYear"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="specialization"
                className="block text-sm/6 font-medium"
              >
                Area of Specialization
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="specialization"
                  type="text"
                  name="specialization"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="institution"
                className="block text-sm/6 font-medium"
              >
                Institution
              </label>
              <div className="mt-2">
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="teachingExp"
                className="block text-sm/6 font-medium"
              >
                Total Teaching Experience (Years)
              </label>
              <div className="mt-2">
                <input
                  id="teachingExp"
                  name="teachingExp"
                  type="number"
                  min="0"
                  step="0.5"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="researchExp"
                className="block text-sm/6 font-medium"
              >
                Total Research Experience (Years)
              </label>
              <div className="mt-2">
                <input
                  id="researchExp"
                  name="researchExp"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="researchInterns"
                className="block text-sm/6 font-medium"
              >
                Are you looking for research interns?
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="researchInterns"
                  name="researchInterns"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe / Not Sure</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cv" className="block text-sm/6 font-medium">
                Upload CV/Resume
              </label>
              <div className="mt-2">
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form>
  );
};
export default Register;
