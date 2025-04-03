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

        if (resUid.status == 401) {
          // if not logged in
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
        } else if (resUid.ok) {
          const dataUid = await resUid.json();
          setProfDetails(dataUid.data);
        } else {
          console.log("Failed to fetch prof details!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, uid]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
        <p className="text-xl font-semibold text-white">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
        <p className="text-xl font-semibold text-white">Error: {error}</p>
      </div>
    );

  return (
    <div className="relative">
      {isLoggedIn && <Header isProf={true} />}
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-cover bg-center h-40"></div>
          {/* Profile Photo */}
          <div className="-mt-16 flex justify-center">
            <img
              src={photoLinks[uid as keyof typeof photoLinks]}
              alt={`${profDetails?.firstName} ${profDetails?.lastName}`}
              className="w-32 h-34 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <div className="px-6 py-4 text-center">
            {/* Professor Details */}
            <h2 className="text-3xl font-bold text-gray-800">
              {profDetails?.firstName} {profDetails?.lastName}
            </h2>
            <p className="text-gray-600">{profDetails?.email}</p>
            <p className="mt-2 text-indigo-600 font-semibold">
              Faculty at {profDetails?.institution || "N/A"}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {profDetails?.contact && (
                <p>
                  <strong>📞 Contact:</strong> {profDetails.contact}
                </p>
              )}
              {profDetails?.website && (
                <p>
                  <strong>🌐 Website:</strong>{" "}
                  <a
                    href={profDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition duration-300"
                  >
                    Visit Website
                  </a>
                </p>
              )}
              {profDetails?.gscholar && (
                <p>
                  <strong>🎓 Google Scholar:</strong>{" "}
                  <a
                    href={profDetails.gscholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition duration-300"
                  >
                    View Profile
                  </a>
                </p>
              )}
              {profDetails?.qualification && (
                <p>
                  <strong>🏆 Qualification:</strong> {profDetails.qualification}
                </p>
              )}
              {profDetails?.specialization && (
                <p>
                  <strong>📚 Specialization:</strong>{" "}
                  {profDetails.specialization}
                </p>
              )}
              {profDetails?.teachingExp && (
                <p>
                  <strong>👨‍🏫 Teaching Experience:</strong>{" "}
                  {profDetails.teachingExp} years
                </p>
              )}
              {profDetails?.researchExp && (
                <p>
                  <strong>🔬 Research Experience:</strong>{" "}
                  {profDetails.researchExp} years
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
