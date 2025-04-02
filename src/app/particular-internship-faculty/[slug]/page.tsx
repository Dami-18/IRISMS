"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/Components/Header";
import Link from "next/link";

const InternshipApplications = () => {
  const router = useRouter();
  const Params = useParams();
  const slug = Params.slug;

  const [project, setProject] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [studentEmail, setStudentEmail] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  const scheduleInterview = async () => {
    if (!studentEmail || !interviewDate || !interviewTime) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/scheduleInterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: studentEmail,
          date: interviewDate,
          time: interviewTime,
        }),
      });

      if (!res.ok) throw new Error("Failed to schedule interview");

      const result = await res.json();
      console.log(`Interview scheduled! Room Name: ${result.roomName}`);
      router.push(`/interview/${result.roomName}`);
      setShowModal(false);
    } catch (err) {
      console.log("Error scheduling interview:", err);
    } finally {
      setLoading(false);
    }
  };

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
        setApplications(result.data.applications);
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
    if (!confirm("Are you sure you want to delete this project?")) return;

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update application status");

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
      <Header isStudent={false} />

      <div className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            Applications for {project?.name}
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-7 right-6 mr-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Schedule Interview
          </button>

          {/* Delete Project Button */}
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
                <div
                  key={app.id}
                  className="bg-white rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border-l-[5px] border-yellow-600 overflow-hidden cursor-pointer p-6"
                >
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    Applicant: {app.user?.firstName} {app.user?.lastName}
                  </h2>
                  <p>
                    <strong>Email:</strong> {app.user?.email}
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
                    {app.user?.cvUrl && (
                      <Link
                        href={"http://localhost:3000/" + app.user.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View CV
                      </Link>
                    )}
                    {app.user?.transcriptUrl && (
                      <Link
                        href={"http://localhost:3000/" + app.user.transcriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Transcript
                      </Link>
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

        {/* Modal for Scheduling Interview */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
              {/* Modal Header */}
              <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                Schedule Interview
              </h2>

              {/* Form */}
              <form>
                {/* Email Input */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Student Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Date Input */}
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interview Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Time Input */}
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interview Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition duration-200 ease-in-out"
                  >
                    Cancel
                  </button>

                  {/* Schedule Button */}
                  <button
                    type="button"
                    onClick={scheduleInterview}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                      loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    }`}
                  >
                    {loading ? "Scheduling..." : "Schedule"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipApplications;
