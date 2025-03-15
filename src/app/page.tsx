"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/Components/Modal"; // Import the Modal component

const WelcomePage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://picsum.photos/1920/1080')`,
      }}
    >
      {/* Main Container */}
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Integrated Research Internship and Scholarship Management
          System
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Streamlining research internships and scholarships for students and
          professors.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Login Button */}
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          {/* Register Button */}
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>

      {/* Registration Modal */}
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
    </div>
  );
};

export default WelcomePage;
