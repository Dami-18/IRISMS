"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import photoLinks from "@/../public/photoLinks.json"; // Adjust the path based on where you place the JSON file

const ProfessorsPage = () => {
  const router = useRouter();
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch professors from the API
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch("/api/getAllProfessors", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch professors.");
        }
        const data = await response.json();
        // Add photo links to the fetched data
        const formattedData = data.data.map((prof: any) => ({
          uid: prof.uid,
          name: `${prof.firstName} ${prof.lastName}`,
          specialization: prof.specialization,
          photo: photoLinks[prof.uid as keyof typeof photoLinks] || "",
        }));
        setProfessors(formattedData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  // Handle card click
  const handleCardClick = (uid: string) => {
    router.push(`/profile-faculty/${uid}`);
  };

  if (loading) return <p>Loading professors...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Professors on IRISMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {professors.map((professor: any) => (
          <div
            key={professor.uid}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(professor.uid)}
          >
            <div className="flex flex-col items-center">
              {/* Round Profile Picture */}
              <img
                src={professor.photo}
                alt={professor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              {/* Professor Name */}
              <h2 className="text-lg font-semibold text-center">{professor.name}</h2>
              {/* Specialization */}
              <p className="text-sm text-gray-600 text-center">{professor.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorsPage;
