"use client";
import { useState } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Hardcoded scholarships data
  const scholarships = [
    {
      id: 1,
      name: "National Merit Scholarship",
      provider: "Government of India",
      location: "India",
      eligibility: ["High School", "Merit-Based"],
    },
    {
      id: 2,
      name: "Global Excellence Scholarship",
      provider: "University of XYZ",
      location: "USA",
      eligibility: ["Undergraduate", "International Students"],
    },
    {
      id: 3,
      name: "Tech Innovators Grant",
      provider: "Tech Foundation",
      location: "India",
      eligibility: ["STEM Students", "Innovation"],
    },
    {
      id: 4,
      name: "Women in STEM Scholarship",
      provider: "Global STEM Alliance",
      location: "Canada",
      eligibility: ["Women", "STEM Fields"],
    },
    {
      id: 5,
      name: "Arts & Culture Scholarship",
      provider: "Cultural Heritage Organization",
      location: "UK",
      eligibility: ["Arts Students", "Culture Enthusiasts"],
    },
  ];

  // Filter scholarships based on search query and location filter
  const filteredScholarships = scholarships.filter(
    (scholarship) =>
      scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationFilter ? scholarship.location === locationFilter : true)
  );

  return (
    <>
      <Header isStudent={true} />
      <main className="max-w-screen-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Explore Scholarships</h1>

        {/* Search & Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search scholarships..."
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
            {/* Populate dropdown with unique locations */}
            {[...new Set(scholarships.map((scholarship) => scholarship.location))].map(
              (location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              )
            )}
          </select>
        </div>

        {/* Scholarship Cards */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold">{scholarship.name}</h3>
                <p>{scholarship.provider}</p>
                <p>{scholarship.location}</p>

                {/* Tags for eligibility */}
                <div className="flex flex-wrap gap-2 my-2">
                  {scholarship.eligibility.map((criteria, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {criteria}
                    </span>
                  ))}
                </div>

                <Link href={`/particular-scholarship/${scholarship.id}`}>
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
