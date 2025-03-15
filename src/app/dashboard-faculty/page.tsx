"use client";

import { useEffect, useState } from "react";


// const projects = [
//   {
//     name: "ML INTERNSHIP",
//     faculty_name: "Alakh Pande",
//     email: "leslie.alexander@example.com",
//     description: " This is the project description",
//   },
//   {
//     name: "ML INTERNSHIP",
//     faculty_name: "Alakh Pande",
//     email: "leslie.alexander@example.com",
//     description: " This is the project description",
//   },
//   {
//     name: "ML INTERNSHIP",
//     faculty_name: "Alakh Pande",
//     email: "leslie.alexander@example.com",
//     description: " This is the project description",
//   },
// ];

const Dashboard = () => {
  const [profDetails, setProfDetails] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfDetails = async () => {
      try {
        const res = await fetch("/api/prof", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch professor details");
        }

        const data = await res.json();
        setProfDetails(data.data);

        if (data.data.currentProjects && data.data.currentProjects.length > 0) {
          const projectPromises = data.data.currentProjects.map((projectId: number) =>
            fetch("/api/getProjectDetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: projectId }),
            })
              .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch project details");
                return response.json();
              })
              .then((projectData) => projectData.data)
          );

          const fetchedProjects = await Promise.all(projectPromises);
          setProjects(fetchedProjects); // Set all fetched projects in state
        }
      }
      catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error of unknown type occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex flex-row-reverse">
        {/* Add Modals for adding projects and route for past projects*/}
        <button className="mr-12 mb-4 mt-4 ml-12 border-2 rounded-full p-4 hover:bg-green-500">
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
    </div>
  );
};

export default Dashboard;
