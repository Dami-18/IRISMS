"use client";

import { useEffect, useState } from "react";
import AddProjectModal from "@/Components/AddProjectModal";
import Link from "next/link";
import Header from "@/Components/Header";

const Dashboard = () => {
  const [profDetails, setProfDetails] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchProfDetails = async () => {
    try {
      const res = await fetch("/api/prof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch professor details");

      const data = await res.json();
      setProfDetails(data.data);

      setProjects(data.data.projectsCurrent || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header isStudent={false} />
      <div className="flex flex-row-reverse">
        {/* Add Modals for adding projects and route for past projects*/}
        <button
          onClick={() => setShowModal(true)}
          className="mr-12 mb-4 mt-4 ml-12 border-2 rounded-full p-4 hover:bg-green-500"
        >
          Add a Project
        </button>
      </div>

      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/particular-internship-faculty/${project.id}`}
        >
          {" "}
          {/* redirect to particular internship page from faculty point of view */}
          <div className="cursor-pointer flex">
            <li
              key={project.id}
              className="flex justify-between gap-x-6 py-5 bg-amber-100 border-2 rounded-xl p-12 m-12 hover:bg-green-200"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-xl font-semibold">Project {index + 1}</p>
                  <p className="text-xl font-semibold">{project.name}</p>
                  <p className="">{project.mode}</p>
                  <p className="">{project.stipend}</p>
                </div>
              </div>
            </li>
          </div>
        </Link>
      ))}

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onProjectAdded={() => fetchProfDetails()}
        />
      )}
    </div>
  );
};

export default Dashboard;
