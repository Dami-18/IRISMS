"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Internship = () => {
  const router = useRouter();
  const { slug } = router.query; // Extract project ID (slug) from URL parameters

  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [extraDetails, setExtraDetails] = useState("");

  // Fetch project details using the API
  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchProjectDetails = async () => {
      try {
        const res = await fetch("/api/getProjectDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: slug }), // Pass project ID as body
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch project details");
        }

        const data = await res.json();
        setProjectDetails(data.data); // Set project details in state
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
        method: "GET", // if gives error, accordingly change in api to GET() or change here to POST
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies
      });

      const { message, data } = await res.json();

      const result = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: slug, // Use the project ID from the URL
          studentId: data.id,
          email: data.email,
          sop: extraDetails, // Include sop entered in the modal
        }),
      });

      if (result.status === 200) {
        console.log("Successfully applied for the internship!");
        setShowModal(false); // Close modal after successful submission
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{projectDetails?.name}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Faculty Name:</strong> {projectDetails?.facultyName}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Organization:</strong> {projectDetails?.location}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Mode:</strong> {projectDetails?.mode}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Stipend:</strong> {projectDetails?.stipend}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Duration:</strong> {projectDetails?.duration} months
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Topics:</strong> {projectDetails?.topics.join(", ")}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Eligibility:</strong> {projectDetails?.eligibility}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Prerequisites:</strong> {projectDetails?.prerequisites}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {projectDetails?.projectDesc}
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
                applyOnClick(); // Call applyOnClick when form is submitted, maybe show some react hot toast on clicking this
              }}
              className="space-y-4"
            >

              <textarea
                required
                name="extraDetails"
                placeholder="Write a statement of purpose in around 100-150 words (including why you're interested in this internship, what learnings will you get, what do you expect)"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                className="border p-2 w-full rounded h-[100px]"
              />

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
