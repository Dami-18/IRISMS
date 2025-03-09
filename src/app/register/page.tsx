// Register Page
"use client";
import { useActionState, useState } from "react";
import Form from "next/form";
import { signup } from "auth";

const Register = () => {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    // Basically action will be a function which will be server sided call it signup.ts we have to validate the data first, using zod library(my suggestion but can do regex method from the scratch)
    // in the same file if the user has entered all the data correctly then call the backend and create a new user so tbh isme bas ab registration info,design change hogi and action me function name aayega basssssss backend se bas we'll do one api call
    <Form action={action}>
      <div className="space-y-12 p-20">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600"></p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm/6 font-medium">
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue="ewfuwehuf"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            {/*change the error style create a modal or something for it*/}
            {state?.errors?.username && (
              <p className="text-red-800">{state.errors.username}</p>
            )}

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

            {/* <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div> */}

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

            {/*change the error style create a modal or something for it*/}
            {state?.errors?.email && (
              <p className="text-red-800">{state.errors.email}</p>
            )}

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium"
              >
                Residential Address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm/6 font-medium">
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Academic info, here user will also upload CV and transcript */}

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold">Academic Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Provide Details of Your Education and Relevant Experience
          </p>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="degree" className="block text-sm/6 font-medium">
                Highest Degree
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="degree"
                  name="degree"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>Ph.D</option>
                  <option>Diploma</option>
                  <option>Integrated Master's</option>
                  <option>Senior Secondary (10th)</option>
                  <option>Higher Secondary (12th)</option>
                </select>
              </div>
            </div>


            <div className="sm:col-span-3">
              <label
                htmlFor="gradYear"
                className="block text-sm/6 font-medium"
              >
                Year of Graduation
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
              <label htmlFor="major" className="block text-sm/6 font-medium">
                Majors
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="major"
                  type="text"
                  name="major"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                </input>
              </div>
            </div>


            <div className="sm:col-span-3">
              <label
                htmlFor="insti"
                className="block text-sm/6 font-medium"
              >
                Institution
              </label>
              <div className="mt-2">
                <input
                  id="insti"
                  name="insti"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* document upload 
            later change to better design, also uploading not yet handled in api
            */}

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

            <div className="sm:col-span-3">
              <label htmlFor="transcript" className="block text-sm/6 font-medium">
                Upload Transcript
              </label>
              <div className="mt-2">
                <input
                  id="transcript"
                  name="transcript"
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
