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
        setScholarships(result.data.scholarshipApplications || []);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
        <p className="text-xl font-semibold text-red-600">Error fetching data</p>
      </div>
    );

  return (
    <>
      <Header isStudent={true} />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dashboard Content */}
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">

        {/* Internship Applications */}
        {activeTab === "internships" && (
          <>
            <h2 className="text-center font-extrabold text-xl mb-4 text-indigo-700">
              Internship Applications
            </h2>
            {applications.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Internship Name</th>
                    <th className="border border-gray-300 p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-3">{application.project.name}</td>
                      <td className="border border-gray-300 p-3">
                        {application.status === "APPROVED" && (
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                            Approved
                          </span>
                        )}
                        {application.status === "REJECTED" && (
                          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                            Rejected
                          </span>
                        )}
                        {application.status === "PENDING" && (
                          <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 mt-4">No internship applications found.</p>
            )}
          </>
        )}

        {/* Scholarship Applications */}
        {activeTab === "scholarships" && (
          <>
            <h2 className="text-center font-extrabold text-xl mb-4 text-indigo-700">
              Scholarship Applications
            </h2>
            {scholarships.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Scholarship Name</th>
                    <th className="border border-gray-300 p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((scholarship) => (
                    <tr key={scholarship.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-3">{scholarship.scholarship.name}</td>
                      <td className="border border-gray-300 p-3">
                        {scholarship.status === "APPROVED" && (
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                            Approved
                          </span>
                        )}
                        {scholarship.status === "REJECTED" && (
                          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                            Rejected
                          </span>
                        )}
                        {scholarship.status === "PENDING" && (
                          <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 mt-4">No scholarship applications found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
