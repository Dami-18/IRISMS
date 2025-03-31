"use client";
import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState<{
    remoteOnsite: string;
    stipend: Array<number>;
    location: string;
    prerequisites: Array<string>;
    duration: Array<number>;
  }>({
    remoteOnsite: "all", // "remote", "onsite", or "all"
    stipend: [0, 50000], // Slider range
    location: "",
    prerequisites: [], // Default empty array for filtering
    duration: [0, 12], // Duration in months
  });

  const prerequisiteOptions = ["React", "Node.js", "Python", "Java"]; // List of available prerequisites

  // Fetch projects based on filters
  useEffect(() => {
    const query = new URLSearchParams({
      search: searchQuery,
      remoteOnsite: filter.remoteOnsite,
      stipendMin: filter.stipend[0].toString(),
      stipendMax: filter.stipend[1].toString(),
      location: filter.location,
      prerequisites: filter.prerequisites.join(","),
      durationMin: filter.duration[0].toString(),
      durationMax: filter.duration[1].toString(),
    });

    fetch(`/api/getAllProjects?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [searchQuery, filter]);

  // Handle checkbox changes for prerequisites
  const handleCheckboxChange = (prerequisite: string) => {
    setFilter((prevFilter) => {
      if (prevFilter.prerequisites.includes(prerequisite)) {
        // If already selected, remove it
        return {
          ...prevFilter,
          prerequisites: prevFilter.prerequisites.filter(
            (item) => item !== prerequisite
          ),
        };
      } else {
        // Otherwise, add it to the list
        return {
          ...prevFilter,
          prerequisites: [...prevFilter.prerequisites, prerequisite],
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilter({
      remoteOnsite: "all",
      stipend: [0, 50000],
      location: "",
      prerequisites: [],
      duration: [0, 12],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
      <Header isStudent={true} />

      <main className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-left text-indigo-700 mb-8">
          Explore Internships
        </h1>

        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Remote/Onsite Filter */}
            <select
              value={filter.remoteOnsite}
              onChange={(e) =>
                setFilter({ ...filter, remoteOnsite: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-600 outline-none"
            >
              <option value="all">All</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>

            {/* Location Filter */}
            <input
              type="text"
              placeholder="Location"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-600 outline-none"
            />

            {/* Stipend Slider - with custom styling for the filled portion */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stipend</label>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={1000}
                  value={filter.stipend[1]}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      stipend: [filter.stipend[0], parseInt(e.target.value)],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  style={{
                    background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${(filter.stipend[1] / 50000) * 100}%, #e5e7eb ${(filter.stipend[1] / 50000) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-medium text-indigo-700">₹{filter.stipend[0]}</p>
                <p className="text-sm font-medium text-indigo-700">₹{filter.stipend[1]}</p>
              </div>
            </div>

            {/* Duration Slider - with custom styling for the filled portion */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={1}
                  value={filter.duration[1]}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      duration: [filter.duration[0], parseInt(e.target.value)],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  style={{
                    background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${(filter.duration[1] / 12) * 100}%, #e5e7eb ${(filter.duration[1] / 12) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-medium text-indigo-700">{filter.duration[0]} months</p>
                <p className="text-sm font-medium text-indigo-700">{filter.duration[1]} months</p>
              </div>
            </div>

            {/* Prerequisites Checkbox */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites
              </label>
              <div className="flex flex-wrap gap-4">
                {prerequisiteOptions.map((prerequisite) => (
                  <label key={prerequisite} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filter.prerequisites.includes(prerequisite)}
                      onChange={() => handleCheckboxChange(prerequisite)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{prerequisite}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Internship Cards */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 border-l-4 border-yellow-500"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-1">{project.facultyName}</p>
                <p className="text-gray-600 mb-1">{project.location}</p>

                {/* skill/topic tagging */}
                <div className="flex flex-wrap gap-2 my-2">
                  {project.topics &&
                    project.topics.map((topic: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                </div>

                <Link href={`/particular-internship/${project.id}`}>
                  <button className="mt-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No internships found.
          </p>
        )}
      </main>
    </div>
  );
}
