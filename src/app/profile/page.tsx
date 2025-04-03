"use client";
import Header from "@/Components/Header";
import Link from "next/link";
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
  incomeProof?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [editableData, setEditableData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await res.json().then((obj) => {
        setUserData(obj.data);
        setEditableData(obj.data); // Initialize editable data
      });
    };

    fetchDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const saveChanges = async () => {
    const res = await fetch("/api/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(editableData),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      setUserData(editableData); // Update local state
      setIsEditing(false); // Exit editing mode
    } else {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="relative">
      <Header isStudent={true} />
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
            <>
              {!isEditing ? (
                <>
                  <p className="mt-2 text-indigo-600 font-semibold">
                    Student at {editableData?.institution}
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {editableData?.contact && (
                      <p>
                        <strong>📞 Contact:</strong> {editableData?.contact}
                      </p>
                    )}
                    {(editableData?.address ||
                      editableData?.city ||
                      editableData?.state ||
                      editableData?.country) && (
                      <p>
                        <strong>🏠 Address:</strong>{" "}
                        {[
                          editableData?.address,
                          editableData?.city,
                          editableData?.state,
                          editableData?.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                    {editableData?.degree && (
                      <p>
                        <strong>🎓 Degree:</strong> {editableData?.degree} (
                        {editableData?.gradYear})
                      </p>
                    )}
                    {editableData?.major && (
                      <p>
                        <strong>📖 Major:</strong> {editableData?.major}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                  >
                    Edit Profile ✏️
                  </button>
                </>
              ) : (
                <>
                  {/* Editable Form */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {/* First Name and Last Name are view-only */}
                    <input
                      type="text"
                      value={editableData?.firstName || ""}
                      disabled
                      placeholder="First Name"
                      className="border border-gray-300 rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                    />
                    <input
                      type="text"
                      value={editableData?.lastName || ""}
                      disabled
                      placeholder="Last Name"
                      className="border border-gray-300 rounded p-2 w-full bg-gray-100 cursor-not-allowed"
                    />
                    {/* Editable fields */}
                    <input
                      type="text"
                      name="contact"
                      value={editableData?.contact || ""}
                      onChange={handleInputChange}
                      placeholder="Contact"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editableData?.address || ""}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="city"
                      value={editableData?.city || ""}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="state"
                      value={editableData?.state || ""}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="country"
                      value={editableData?.country || ""}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  {/* Save Changes Button */}
                  <button
                    onClick={saveChanges}
                    className="mt-6 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
                  >
                    Save Changes ✅
                  </button>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
