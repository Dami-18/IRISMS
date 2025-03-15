"use client";

import { useState } from "react";

const ExampleInternship = {
  id: 1,
  name: "AI Research Internship",
  facultyName: "Dr. Jibby Patra",
  topics: ["AI", "ML", "Data Science"],
  stipend: "$1000/month",
  duration: 6,
  mode: "remote",
  location: "Online - XYZ Organization",
  eligibility: "Undergraduate students with knowledge of Python",
  prerequisites: "Basic understanding of machine learning concepts",
  projectDesc:
    "This internship focuses on cutting-edge AI research, including neural networks and deep learning.",
};

const Internship = () => {
  const [showModal, setShowModal] = useState(false);
  const [extraDetails, setExtraDetails] = useState("");

  const applyOnClick = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for including cookies
      });

      const { message, data } = await res.json();

      const result = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: ExampleInternship.id, // Hardcoding the project ID for now
          studentId: data.id,
          email: data.email,
          extraDetails, // Include the extra details entered in the modal
        }),
      });

      if (result.status === 200) {
        alert("Successfully applied for the internship!");
        setShowModal(false); // Close modal after successful submission
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Failed to apply for the internship.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{ExampleInternship.name}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Faculty Name:</strong> {ExampleInternship.facultyName}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Organization:</strong> {ExampleInternship.location}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Mode:</strong> {ExampleInternship.mode}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Stipend:</strong> {ExampleInternship.stipend}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Duration:</strong> {ExampleInternship.duration} months
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Topics:</strong> {ExampleInternship.topics.join(", ")}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Eligibility:</strong> {ExampleInternship.eligibility}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Prerequisites:</strong> {ExampleInternship.prerequisites}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {ExampleInternship.projectDesc}
      </p>

      {/* Apply Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Now
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Apply for Internship</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                applyOnClick(); // Call applyOnClick when form is submitted
              }}
              className="space-y-4"
            >
              {/* Extra Details Input */}
              <textarea
                required
                name="extraDetails"
                placeholder="Write statement of purpose in around 100-150 words"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                className="border p-2 w-full rounded h-[100px]"
              />

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internship;
