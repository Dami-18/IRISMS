"use client";
import { useState } from "react";
import Header from "@/Components/Header";

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
}

const internshipsData: Internship[] = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "Amazon", location: "Mumbai" },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Bangalore",
  },
];

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredInternships = internshipsData.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationFilter ? internship.location === locationFilter : true)
  );

  return (
    <>
      <Header />
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
            {[...new Set(internshipsData.map((i) => i.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Internship Cards */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInternships.map((internship) => (
              <div
                key={internship.id}
                className="border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold">{internship.title}</h3>
                <p>{internship.company}</p>
                <p>{internship.location}</p>
                <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                  Apply Now
                </button>
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
