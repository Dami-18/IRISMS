"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function ScholarshipPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
      <Header isStudent={true} />

      <main className="max-w-screen-xl mx-auto p-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-left text-indigo-700 mb-8">
          Explore Scholarships
        </h1>

        {/* Search & Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>

          {/* Location Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
        </div>

        {/* Internship Cards Section */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-500"
              >
                {/* Internship Details */}
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Provider:</span>{" "}
                  {project.provider}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Amount:</span> {project.amount}
                </p>

                {/* Show Details Button */}
                <Link href={`/scholarship-page/${project.id}`}>
                  <button className="mt-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No Scholarships found. Try adjusting your filters.
          </p>
        )}
      </main>
    </div>
  );
}
