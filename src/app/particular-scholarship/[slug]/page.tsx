"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/Components/Header";

const ScholarshipApplications = () => {
  const Params = useParams();
  const slug = Params.slug;

  const [scholarship, setScholarship] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications for the specific scholarship
  useEffect(() => {
    if (!slug) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/getScholarshipDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: slug }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch applications");
        }

        const result = await res.json();
        setApplications(result.data.applications || []); // Ensure it defaults to an empty array
        setScholarship(result.data);
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

    fetchApplications();
  }, [slug]);

  // Update application status
  const updateApplicationStatus = async (
    applicationId: number,
    newStatus: string
  ) => {
    try {
      const res = await fetch("/api/updateScholarshipStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update application status");
      }

      // Update local state after successful API call
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating application status:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
      <Header isStudent={false} />
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            Applications for {scholarship?.name}
          </h1>

          {applications.length === 0 ? (
            <p className="text-gray-600">
              No applications have been submitted yet.
            </p>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg border-l-[5px] border-yellow-600"
                >
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    Applicant: {app.user?.firstName} {app.user?.lastName}
                  </h2>
                  <p>
                    <strong>Email:</strong> {app.user?.email}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {app.status.charAt(0).toUpperCase() +
                      app.status.slice(1).toLowerCase()}
                  </p>
                  <p>
                    <strong>Applied On:</strong>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>

                  {/* Links to Documents */}
                  <div className="flex gap-4 mt-2">
                    {app.user?.cvUrl && (
                      <a
                        href={"http://localhost:3000/" + app.user?.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        CV
                      </a>
                    )}
                    {app.user?.transcriptUrl && (
                      <a
                        href={
                          "http://localhost:3000/" + app.user?.transcriptUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Transcript
                      </a>
                    )}
                    {app.user?.incomeProof && (
                      <a
                        href={"http://localhost:3000/" + app.user?.incomeProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Income Statement
                      </a>
                    )}
                  </div>

                  {/* Approve and Reject Buttons */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() =>
                        updateApplicationStatus(app.id, "APPROVED")
                      }
                      disabled={app.status === "APPROVED"}
                      className={`px-4 py-2 rounded ${
                        app.status === "APPROVED"
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateApplicationStatus(app.id, "REJECTED")
                      }
                      disabled={app.status === "REJECTED"}
                      className={`px-4 py-2 rounded ${
                        app.status === "REJECTED"
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplications;
