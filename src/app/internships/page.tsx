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
            {/* Remote/Onsite Filter */}
            <select
              value={filter.remoteOnsite}
              onChange={(e) =>
                setFilter({ ...filter, remoteOnsite: e.target.value })
              }
              className="border border-gray-300 rounded p-2 w-full"
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
              className="border border-gray-300 rounded p-2 w-full"
            />

            {/* Stipend Slider */}
            <div>
              <label className="block text-sm font-medium mb-1">Stipend</label>
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
                className="w-full"
              />
              <p className="text-sm text-gray-600">
                ₹{filter.stipend[0]} - ₹{filter.stipend[1]}
              </p>
            </div>

            {/* Duration Slider */}
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
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
                className="w-full"
              />
              <p className="text-sm text-gray-600">
                {filter.duration[0]} - {filter.duration[1]} months
              </p>
            </div>

            {/* Prerequisites Checkbox */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Prerequisites
              </label>
              <div className="flex flex-wrap gap-2">
                {prerequisiteOptions.map((prerequisite) => (
                  <label key={prerequisite} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filter.prerequisites.includes(prerequisite)}
                      onChange={() => handleCheckboxChange(prerequisite)}
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    {prerequisite}
                  </label>
                ))}
              </div>
            </div>
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
                <p>{project.facultyName}</p>
                <p>{project.location}</p>

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
