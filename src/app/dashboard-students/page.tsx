// currently it gives errors because db me some things are commented
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";

export default function StudDashboard() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "POST", // here GET or POST, need to see that
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setApplications(result.data.applications || []);
        // ye result me password kyu included he demiyaaaaaaaaaaaaaa
        // lmao
        console.log(result);
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
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <>
      <Header isStudent={true} />

      {error && (
        <div className="container mx-auto mt-8 text-red-500">
          Error fetching user details: {error}
        </div>
      )}

      {user && (
        <div className="container mx-auto mt-8">
          {/* Internship Status */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-400">
                <th className="border border-gray-300 p-2 text-left">
                  Internship Name
                </th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Render Applications */}
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

          {/* Explore Internships Link */}
          <div className="mt-[60px] flex justify-center items-center">
            <Link
              href="/internships"
              className="font-semibold bg-blue-400 px-4 py-2 rounded text-white"
            >
              Explore Internships
            </Link>
          </div>
        </div>
      )}

      {/* Display error message if any */}
      {error && (
        <div className="container mx-auto mt-8 text-red-500 font-bold">
          Error fetching user details: {error}
        </div>
      )}
    </>
  );
}
