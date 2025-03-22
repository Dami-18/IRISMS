"use client";

import { useEffect, useState } from "react";
import AddProjectModal from "@/Components/AddProjectModal";
import Link from "next/link";
import Header from "@/Components/Header";

const Dashboard = () => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <Header isStudent={false} /> */}

      {scholarships.map((scholarship, index) => (
        <Link
          key={scholarship.id}
          href={`/particular-internship-faculty/${scholarship.id}`}
        >
          {" "}
          {/* redirect to particular internship page from faculty point of view */}
          <div className="cursor-pointer flex">
            <li
              key={scholarship.id}
              className="flex justify-between gap-x-6 py-5 bg-amber-100 border-2 rounded-xl p-12 m-12 hover:bg-green-200"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-xl font-semibold">Scholarship {index + 1}</p>
                  <p className="text-xl font-semibold">{scholarship.name}</p>
                  <p className="">{scholarship.provider}</p>
                  <p className="">{scholarship.amount}</p>
                  <p className="">{scholarship.eligibility}</p>
                </div>
              </div>
            </li>
          </div>
        </Link>
      ))}

    </div>
  );
};

export default Dashboard;
