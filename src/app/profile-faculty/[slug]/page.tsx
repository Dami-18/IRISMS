"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/Components/Header";
import photoLinks from "@/../public/photoLinks.json";

const FacultyProfile = () => {
  const { slug } = useParams(); // Extract `uid` from URL parameters

  const [uid, setUid] = useState<any>(slug); // Initialize `uid` with slug or null
  const [profDetails, setProfDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Combined API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUid = await fetch("/api/prof", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies to identify logged-in user
        });

        if (resUid.status == 401) { // if not logged in
          setIsLoggedIn(false); // prof is not logged in, so we display the public profile by calling the public end point

          const resProfDetails = await fetch("/api/getProf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: uid }),
          });

          if (!resProfDetails.ok) {
            const errorData = await resProfDetails.json();
            throw new Error(
              errorData.message || "Failed to fetch professor details"
            );
          }

          const dataProfDetails = await resProfDetails.json();
          setProfDetails(dataProfDetails.data); // Set professor details in state
        }

        else if (resUid.ok) {
          const dataUid = await resUid.json();
          setProfDetails(dataUid.data)
        }

        else{
          console.log("Failed to fetch prof details!")
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, uid]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="relative">
      {isLoggedIn && <Header isStudent={false} />}
      <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <img
            src={photoLinks[uid as keyof typeof photoLinks]} 
            alt={`${profDetails?.firstName} ${profDetails?.lastName}`}
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Professor Details */}
        <h1 className="text-3xl font-bold mb-4">
          {profDetails?.firstName} {profDetails?.lastName}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Email:</strong> {profDetails?.email}
        </p>
        {profDetails?.contact && (
          <p className="text-lg text-gray-700 mb-2">
            <strong>Contact:</strong> {profDetails.contact}
          </p>
        )}
        {profDetails?.website && (
          <p className="text-lg text-gray-700 mb-2">
            <strong>Website:</strong>{" "}
            <a
              href={profDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Website
            </a>
          </p>
        )}
        {profDetails?.gscholar && (
          <p className="text-lg text-gray-700 mb-2">
            <strong>Google Scholar:</strong>{" "}
            <a
              href={profDetails.gscholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Profile
            </a>
          </p>
        )}
        <p className="text-lg text-gray-700 mb-2">
          <strong>Qualification:</strong> {profDetails?.qualification || "N/A"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Specialization:</strong>{" "}
          {profDetails?.specialization || "N/A"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Institution:</strong> {profDetails?.institution || "N/A"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Teaching Experience:</strong>{" "}
          {profDetails?.teachingExp
            ? `${profDetails.teachingExp} years`
            : "N/A"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Research Experience:</strong>{" "}
          {profDetails?.researchExp
            ? `${profDetails.researchExp} years`
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default FacultyProfile;
