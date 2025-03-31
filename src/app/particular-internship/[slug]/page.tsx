"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/Components/Header";
import toast, { Toaster } from "react-hot-toast";

const Internship = () => {
  const router = useRouter();
  const { slug } = useParams(); // Extract project ID (slug) from URL parameters

  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [extraDetails, setExtraDetails] = useState("");

  // Fetch project details using the API
  useEffect(() => {
    if (!slug) return;

    const fetchProjectDetails = async () => {
      try {
        const res = await fetch("/api/getProjectDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: slug }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to fetch project details"
          );
        }

        const data = await res.json();
        setProjectDetails(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [slug]);

  // Apply for internship
  const applyOnClick = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user details");

      const { data } = await res.json();

      const result = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: slug,
          studentId: data.id,
          email: data.email,
          sop: extraDetails,
        }),
      });

      if (result.status === 200) {
        toast.success("Successfully applied for the internship!");
        setShowModal(false); // Close modal after successful submission
      } else {
        throw new Error("Failed to apply for the internship");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error occurred");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 relative">
      <Header isStudent={true} />

      {/* React Hot Toast Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Internship Details Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
          {/* Project Name */}
          <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
            {projectDetails?.name}
          </h1>

          {/* Project Details */}
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="font-medium">Faculty Name:</strong> {projectDetails?.facultyName}
            </p>
            <p>
              <strong className="font-medium">Organization:</strong> {projectDetails?.location}
            </p>
            <p>
              <strong className="font-medium">Mode:</strong> {projectDetails?.mode}
            </p>
            <p>
              <strong className="font-medium">Stipend:</strong> ₹{projectDetails?.stipend}
            </p>
            <p>
              <strong className="font-medium">Duration:</strong> {projectDetails?.duration} months
            </p>
            <p>
              <strong className="font-medium">Topics:</strong> {projectDetails?.topics.join(", ")}
            </p>
            <p>
              <strong className="font-medium">Eligibility:</strong> {projectDetails?.eligibility}
            </p>
            <p>
              <strong className="font-medium">Prerequisites:</strong> {projectDetails?.prerequisites}
            </p>
            <p>
              <strong className="font-medium">Description:</strong> {projectDetails?.projectDesc}
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Apply Now
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-auto transform transition-transform duration-300 ease-in-out">
                {/* Modal Header */}
                <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text">
                  Apply for Internship
                </h2>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyOnClick();
                  }}
                  className="space-y-4"
                >
                  {/* SOP Input */}
                  <textarea
                    required
                    name="extraDetails"
                    placeholder="Write a statement of purpose in around 100-150 words..."
                    value={extraDetails}
                    onChange={(e) => setExtraDetails(e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-lg h-[100px] resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />

                  {/* Terms and Conditions */}
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <p className="text-sm text-gray-700 mb-2">
                      By applying for this internship, you agree to the following terms:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                      <li>Your CV and transcript will be shared with the organization.</li>
                      <li>Your personal information may be used for evaluation purposes.</li>
                      <li>You confirm that all provided information is accurate and up-to-date.</li>
                    </ul>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        required
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span>I agree to the terms and conditions.</span>
                    </label>
                  </div>

                  {/* Modal Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-red-300 text-black rounded-lg hover:bg-red-400 transition duration-[200ms] ease-in-out shadow-md"
                    >
                      Cancel
                    </button>

                    {/* Apply Button */}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-[200ms] ease-in-out shadow-md"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
};

export default Internship;
