"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const InternshipApplications = () => {
  const router = useRouter();
  const Params = useParams();
  const slug = Params.slug;

  const [project, setProject] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications for the specific project
  useEffect(() => {
    if (!slug) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/getProjectDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: slug }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch applications");
        }

        const result = await res.json();
        setApplications(result.data.applications); // Populate applications state
        setProject(result.data);
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

  const deleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return; // maybe here we can show a modal box, will do it later

    try {
      const res = await fetch("/api/deleteProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: slug }),
      });

      if (!res.ok) throw new Error("Failed to delete project");

      router.push("/dashboard-faculty");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Update application status
  const updateApplicationStatus = async (
    applicationId: number,
    newStatus: string
  ) => {
    try {
      const res = await fetch("/api/updateApplicationStatus", {
        // ye api banana baaki hai
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Applications for {project.name}
      </h1>

      {/* delete project button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={deleteProject}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove Project
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-600">
          No applications have been submitted yet.
        </p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">
                Applicant: {app.user.firstName} {app.user.lastName}
              </h2>
              <p>
                <strong>Email:</strong> {app.user.email}
              </p>
              <p>
                <strong>SOP:</strong> {app.sop}
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

              {/* Links to CV and Transcript */}
              <div className="flex gap-4 mt-2">
                {app.user.cvUrl && (
                  <a
                    href={app.user.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View CV
                  </a>
                )}
                {app.user.transcriptUrl && (
                  <a
                    href={app.user.transcriptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Transcript
                  </a>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateApplicationStatus(app.id, "APPROVED")} // or can call different api for reject and approve
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
                  onClick={() => updateApplicationStatus(app.id, "REJECTED")}
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
  );
};

export default InternshipApplications;
