"use client";

import { useEffect, useState } from "react";
import AddProjectModal from "@/Components/AddProjectModal";
import { useRouter } from "next/navigation";

const router = useRouter();

const Dashboard = () => {
  const [profDetails, setProfDetails] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchProfDetails = async () => {
    try {
      const res = await fetch("/api/prof", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch professor details");
      const data = await res.json();
      setProfDetails(data.data);

      if (data.data.currentProjects?.length > 0) {
        const projectPromises = data.data.currentProjects.map((projectId: number) =>
          fetch("/api/getProjectDetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: projectId }),
          }).then((res) => res.json()).then((data) => data.data)
        );

        setProjects(await Promise.all(projectPromises));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfDetails(); }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex flex-row-reverse">
        {/* Add Modals for adding projects and route for past projects*/}
        <button onClick={() => setShowModal(true)}
          className="mr-12 mb-4 mt-4 ml-12 border-2 rounded-full p-4 hover:bg-green-500">
          Add a Project
        </button>
      </div>
      {projects.map((project, index) => (
        <div key={index + 1} className="flex">
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
