"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/Components/Header";
import toast, { Toaster } from "react-hot-toast";

const Scholarship = () => {
  const { slug } = useParams(); // Extract project ID (slug) from URL parameters

  const [scholarshipDetails, setScholarshipDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  // Fetch scholarship details using the API
  useEffect(() => {
    if (!slug) return;

    const fetchScholarshipDetails = async () => {
      try {
        const res = await fetch("/api/getScholarshipDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: slug }), // Pass project ID as body
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to fetch scholarship details"
          );
        }

        const data = await res.json();
        setScholarshipDetails(data.data); // Set project details in state
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

    fetchScholarshipDetails();
  }, [slug]);

  // Apply for scholarship
  const applyOnClick = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies
      });

      if (!res.ok) throw new Error("Failed to fetch user details");

      const { data } = await res.json();

      const result = await fetch("/api/applyScholarship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoId: slug, // Use the project ID from the URL
          studentId: data.id,
          email: data.email,
        }),
      });

      if (result.status === 200) {
        toast.success("Successfully applied for the scholarship!");
        setShowModal(false); // Close modal after successful submission
      } else {
        throw new Error("Failed to apply for the scholarship");
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
      <Header isStudent={true} />

      {/* React Hot Toast Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Scholarship Details Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
          {/* Scholarship Name */}
          <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
            {scholarshipDetails?.name}
          </h1>

          {/* Scholarship Details */}
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="font-medium">Offered By:</strong>{" "}
              {scholarshipDetails?.provider}
            </p>
            <p>
              <strong className="font-medium">Amount:</strong>{" "}
              {scholarshipDetails?.amount}
            </p>
            <p>
              <strong className="font-medium">Duration:</strong>{" "}
              {scholarshipDetails?.duration} months
            </p>
            <p>
              <strong className="font-medium">Eligibility:</strong>{" "}
              {scholarshipDetails?.eligibility}
            </p>
            <p>
              <strong className="font-medium">Description:</strong>{" "}
              {scholarshipDetails?.desc}
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Apply for Scholarship
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex justify-center items-center z-50">
              {/* Modal Content */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4 text-indigo-700">
                  Terms and Conditions
                </h2>
                <p className="text-gray-700 mb-6">
                  By applying for this scholarship, you agree to share your CV,
                  transcript, and financial documents with the offering
                  organization. Please ensure that all documents are accurate
                  and up-to-date.
                </p>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-4">
                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition duration-[200ms] ease-in-out shadow-md"
                  >
                    Cancel
                  </button>

                  {/* Accept/Apply Button */}
                  <button
                    type="button"
                    onClick={applyOnClick}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-[200ms] ease-in-out shadow-md"
                  >
                    Accept & Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
