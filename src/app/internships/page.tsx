// this one is not yet tested, testing to be done

"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/getAllProjects?search=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  }, [searchQuery]);

  const filteredProjects = projects.filter(
    (project) =>
      (locationFilter ? project.location === locationFilter : true)
  );

  return (
    <>
      <Header isStudent={true} />
      <main className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Explore Internships</h1>

        {/* Search & Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">All Locations</option>
            {[...new Set(projects.map((i) => i.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Internship Cards */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .filter(
                (project) =>
                  project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  (locationFilter ? project.location === locationFilter : true)
              )
              .map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>{project.facultyName}</p>
                  <p>{project.location}</p>
                  
                  {/* skill/topic tagging */}
                  <div className="flex flex-wrap gap-2 my-2">
                    {project.topics && project.topics.map((topic: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <Link href={`/particular-internship/${project.id}`}>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                      Show Details
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <p>No internships found.</p>
        )}
      </main>
    </>
  );
}
