"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/Components/Header";

const Dashboard = () => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchScholarshipDetails = async () => {
    try {
      const res = await fetch("/api/getScholarships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include admin credentials
      });
      if (!res.ok) throw new Error("Failed to fetch scholarships");

      const data = await res.json(); // in data, return all the records of table
      setScholarships(data.data); // return all the scholarships in database
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarshipDetails();
  }, []);

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
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Scholarship Dashboard
        </h1>

        {scholarships.length === 0 ? (
          <p className="text-center text-gray-600">No scholarships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship, index) => (
              <Link
                key={scholarship.id}
                href={`/particular-scholarship/${scholarship.id}`}
              >
                <div className="bg-white rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border-l-[5px] border-yellow-600 overflow-hidden cursor-pointer p-6 h-full flex flex-col justify-between">
                  {/* Scholarship Details */}
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    {scholarship.name}
                    </h2>
                    <p>
                      <strong>Provider:</strong> {scholarship.provider}
                    </p>
                    <p>
                      <strong>Amount:</strong> {scholarship.amount}
                    </p>
                    <p>
                      <strong>Eligibility:</strong> {scholarship.eligibility}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-200 text-sm text-gray-500">
                    View applications
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
