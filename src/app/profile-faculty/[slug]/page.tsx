"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const FacultyProfile = () => {
  const { slug } = useParams();

  const uid = slug;

  const [profDetails, setProfDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) return;

    const fetchProfDetails = async () => {
      try {
        const res = await fetch("/api/getProf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to fetch professor details"
          );
        }

        const data = await res.json();
        setProfDetails(data.data); // Set professor details in state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfDetails();
  }, [uid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Profile Photo */}
      <div className="flex justify-center mb-6">
        <img
          src="./api/upload/FIG-1.png"
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
        <strong>Specialization:</strong> {profDetails?.specialization || "N/A"}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Institution:</strong> {profDetails?.institution || "N/A"}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Teaching Experience:</strong>{" "}
        {profDetails?.teachingExp ? `${profDetails.teachingExp} years` : "N/A"}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Research Experience:</strong>{" "}
        {profDetails?.researchExp ? `${profDetails.researchExp} years` : "N/A"}
      </p>
    </div>
  );
};

export default FacultyProfile;
