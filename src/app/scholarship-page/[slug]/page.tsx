"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/Components/Header";

const Scholarship = () => {
  const { slug } = useParams(); // Extract project ID (slug) from URL parameters

  const [scholarshipDetails, setScholarshipDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // details using the API
  useEffect(() => {
    if (!slug) return;

    const fetchscholarshipDetails = async () => {
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

    fetchscholarshipDetails();
  }, [slug]);

  // Apply for internship
  const applyOnClick = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET", // if gives error, accordingly change in api to GET() or change here to POST
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies
      });

      const { message, data } = await res.json();

      const result = await fetch("/api/applyScholarship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: slug, // Use the project ID from the URL
          studentId: data.id,
          email: data.email,
        }),
      });

      if (result.status === 200) {
        console.log("Successfully applied for the scholarship!"); // show react hot toast
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative">
      <Header isStudent={true} />
      <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{scholarshipDetails?.name}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Offered By:</strong> {scholarshipDetails?.provider}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Amount:</strong> {scholarshipDetails?.amount}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Duration:</strong> {scholarshipDetails?.duration} months
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Eligibility:</strong> {scholarshipDetails?.eligibility}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Description:</strong> {scholarshipDetails?.desc}
        </p>

        {/* Apply */}
        <button
          onClick={applyOnClick}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Scholarship;
