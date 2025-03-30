"use client";
import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const result = await res.json();
        setApplications(result.data.applications || []);
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

    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-200">
          <p className="text-black font-medium">Error fetching data</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-700 shadow-md">
        <Header isStudent={true} />
      </div>

      {/* Navbar - Redesign the Navbar component to match this theme */}
      <div className="bg-white shadow-md border-b border-indigo-100">
        <div className="container mx-auto">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto mt-8 px-4 pb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {activeTab === "internships" && (
            <>
              <h2 className="text-center font-bold text-2xl mb-6 text-indigo-800">
                Internship Applications
              </h2>

              {/* Internship Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg">
                        Internship Name
                      </th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b border-gray-200">
                          <span className="font-medium text-black">
                            {application.project.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          {application.status === "APPROVED" && (
                            <span className="font-medium bg-indigo-600 px-3 py-1 rounded-full text-white text-sm">
                              Approved
                            </span>
                          )}
                          {application.status === "REJECTED" && (
                            <span className="font-medium bg-black px-3 py-1 rounded-full text-white text-sm">
                              Rejected
                            </span>
                          )}
                          {application.status === "PENDING" && (
                            <span className="font-medium bg-yellow-500 px-3 py-1 rounded-full text-white text-sm">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-4 text-center text-gray-500"
                        >
                          No applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "scholarships" && (
            <>
              <h2 className="text-center font-bold text-2xl mb-6 text-indigo-800">
                Scholarship Applications
              </h2>

              {/* Scholarship Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg">
                        Scholarship Name
                      </th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scholarships.map((scholarship) => (
                      <tr key={scholarship.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b border-gray-200">
                          <span className="font-medium text-black">
                            {scholarship.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          {scholarship.status === "APPROVED" && (
                            <span className="font-medium bg-indigo-600 px-3 py-1 rounded-full text-white text-sm">
                              Approved
                            </span>
                          )}
                          {scholarship.status === "REJECTED" && (
                            <span className="font-medium bg-black px-3 py-1 rounded-full text-white text-sm">
                              Rejected
                            </span>
                          )}
                          {scholarship.status === "PENDING" && (
                            <span className="font-medium bg-yellow-500 px-3 py-1 rounded-full text-white text-sm">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {scholarships.length === 0 && (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-4 text-center text-gray-500"
                        >
                          No scholarships found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/*Navbar.tsx
// Components/Navbar.tsx
"use client";
import { SetStateAction, useEffect, useState } from "react";

const Navbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleLinkClick = (link: string) => {
    setActiveTab(link);
    localStorage.setItem("activeTab", link);
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) setActiveTab(savedTab);
  }, [setActiveTab]);

  return (
    <div className="flex justify-center m-8">
      <div className="nav-pill p-2 flex">
        <div
          className={`nav-toggle transition-colors duration-300 ${
            activeTab === "internships" ? "nav-indicator-pill" : "text-gray-600"
          }`}
          onClick={() => handleLinkClick("internships")}
        >
          <div className="text-nav-toggle">Internships</div>
        </div>
        <div
          className={`nav-toggle transition-colors duration-300 ${
            activeTab === "scholarships"
              ? "nav-indicator-pill bg-yellow-500"
              : "text-gray-600"
          }`}
          onClick={() => handleLinkClick("scholarships")}
        >
          <div className="text-nav-toggle">Scholarships</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
*/
