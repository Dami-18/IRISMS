"use client";
import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar"; // Import the updated Navbar
import Header from "@/Components/Header";

export default function StudDashboard() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("internships");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const result = await res.json();
        setApplications(result.data.applications || []);
        setScholarships(result.data.scholarshipApplications || []); // Assuming scholarships are fetched here
        setUser(result.data);

        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error of unknown type occurred");
        }
        setLoading(false);
      }
    };

    fetchUserDetails();

    // Restore active tab from localStorage
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <>
      <Header isStudent={true}></Header>
      {/* Render Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render Dashboard Content */}
      <div className="container mx-auto mt-8">
        {activeTab === "internships" && (
          <>
            <h2 className="text-center font-bold text-xl mb-4">
              Internship Applications
            </h2>
            {/* Internship Table */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-400">
                  <th className="border border-gray-300 p-2 text-left">
                    Internship Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="border border-gray-300 p-2">
                      {application.project.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {application.status === "APPROVED" && (
                        <button className="font-semibold bg-green-600 px-2 py-1 rounded text-white">
                          Approved
                        </button>
                      )}
                      {application.status === "REJECTED" && (
                        <button className="font-semibold bg-red-600 px-2 py-1 rounded text-white">
                          Rejected
                        </button>
                      )}
                      {application.status === "PENDING" && (
                        <button className="font-semibold bg-yellow-600 px-2 py-1 rounded text-white">
                          Pending
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "scholarships" && (
          <>
            <h2 className="text-center font-bold text-xl mb-4">
              Scholarship Applications
            </h2>
            {/* Scholarship Table */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-400">
                  <th className="border border-gray-300 p-2 text-left">
                    Scholarship Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship) => (
                  <tr key={scholarship.id}>
                    <td className="border border-gray-300 p-2">
                      {scholarship.scholarship.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {scholarship.status === "APPROVED" && (
                        <button className="font-semibold bg-green-600 px-2 py-1 rounded text-white">
                          Approved
                        </button>
                      )}
                      {scholarship.status === "REJECTED" && (
                        <button className="font-semibold bg-red-600 px-2 py-1 rounded text-white">
                          Rejected
                        </button>
                      )}
                      {scholarship.status === "PENDING" && (
                        <button className="font-semibold bg-yellow-600 px-2 py-1 rounded text-white">
                          Pending
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
