// profile page
// logic - in the stored token after login, check the uid and check if it is prof or student and display the profile details accordingly
"use client";
import { useEffect, useState } from "react";

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  contact?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  degree?: string;
  gradYear?: string;
  major?: string;
  institution?: string;
  cvUrl?: string;
  transcriptUrl?: string;
}

const Profile = () => {
  const [isProf, setIsProf] = useState<boolean | undefined>(undefined);

  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch("api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await res.json().then((obj) => {
        setUserData(obj.data);
      });
    };

    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div
          className="bg-cover bg-center h-40"
          style={{
            backgroundImage:
              'url("https://source.unsplash.com/random/1600x400?abstract")',
          }}
        ></div>
        <div className="-mt-16 flex justify-center">
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.firstName}+${userData?.lastName}&background=random`}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="px-6 py-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {userData?.firstName} {userData?.lastName}
          </h2>
          <p className="text-gray-600">{userData?.email}</p>

          {isProf ? (
            <>
              <p className="mt-2 text-indigo-600 font-semibold">
                Professor at {userData?.institution}
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {userData?.contact && (
                  <p>
                    <strong>📞 Contact:</strong> {userData?.contact}
                  </p>
                )}
              </div>
              {userData?.cvUrl && (
                <a
                  href={userData?.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
                >
                  View CV 📄
                </a>
              )}
            </>
          ) : (
            <>
              <p className="mt-2 text-indigo-600 font-semibold">
                Student at {userData?.institution}
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {userData?.contact && (
                  <p>
                    <strong>📞 Contact:</strong> {userData?.contact}
                  </p>
                )}
                {(userData?.address ||
                  userData?.city ||
                  userData?.state ||
                  userData?.country) && (
                  <p>
                    <strong>🏠 Address:</strong>{" "}
                    {[
                      userData?.address,
                      userData?.city,
                      userData?.state,
                      userData?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {userData?.degree && (
                  <p>
                    <strong>🎓 Degree:</strong> {userData?.degree} (
                    {userData?.gradYear})
                  </p>
                )}
                {userData?.major && (
                  <p>
                    <strong>📖 Major:</strong> {userData?.major}
                  </p>
                )}
              </div>
              {(userData?.cvUrl || userData?.transcriptUrl) && (
                <div className="mt-6 space-x-4">
                  {userData?.cvUrl && (
                    <a
                      href={userData?.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                      View CV 📄
                    </a>
                  )}
                  {userData?.transcriptUrl && (
                    <a
                      href={userData?.transcriptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
                    >
                      Transcript 🎓
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
// this needs to be changed and display editable details of student or prof
