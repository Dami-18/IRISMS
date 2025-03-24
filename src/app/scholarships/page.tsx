"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState<{
    location: string;
  }>({
    location: "",
  });

  // Fetch projects based on filters
  useEffect(() => {
    const query = new URLSearchParams({
      search: searchQuery,
      location: filter.location,
    });

    fetch(`/api/getAllScholarships?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [searchQuery, filter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilter({
      location: "",
    });
  };

  return (
    <>
      <Header isStudent={true} />
      <main className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Explore Internships</h1>

        {/* Search & Filter */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Location Filter */}
            <input
              type="text"
              placeholder="Location"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        {/* Internship Cards */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p>{project.provider}</p>
                <p>{project.amount}</p>

                <Link href={`/scholarship-page/${project.id}`}>
                  <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No scholarships found.</p>
        )}
      </main>
    </>
  );
}
