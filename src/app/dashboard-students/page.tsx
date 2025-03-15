// currently it gives errors because db me some things are commented
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'POST', // here GET or POST, need to see that
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        setUser(result.data);
        setLoading(false);

      } catch (err) {
        if(err instanceof Error){
          setError(err.message);
        }
        else{
          setError("Error of unknown type occurred")
        }
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <>
      <header className="bg-blue-500 p-2 text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="space-y-2">
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </header>

      {isMenuOpen && (
        <nav className="bg-blue-400 p-4">
          <ul className="space-y-2">
            <li><Link href="/" className="text-white hover:text-blue-100">Home</Link></li>
            <li><Link href="/profile-students" className="text-white hover:text-blue-100">Profile</Link></li>
            <li><Link href="/settings" className="text-white hover:text-blue-100">Settings</Link></li>
          </ul>
        </nav>
      )}

      {error && (
        <div className="container mx-auto mt-8 text-red-500">
          Error fetching user details: {error}
        </div>
      )}

      {user && (
        <div className="container mx-auto mt-8">
        {/*    <h3 className="text-xl font-semibold mb-4">Welcome, {user.firstName} {user.lastName}</h3>

           <div className="mb-6">
             <h4 className="font-semibold">Personal Information:</h4>
             <p>Email: {user.email}</p>
             <p>Contact: {user.contact}</p>
             <p>Address: {user.address}, {user.city}, {user.state}, {user.country}</p>
           </div>

           <div className="mb-6">
             <h4 className="font-semibold">Academic Information:</h4>
             <ul>
               <li>Degree: {user.degree}</li>
               <li>Graduation Year: {user.gradyear}</li>
               <li>Major: {user.major}</li>
               <li>Institution: {user.institution}</li>
             </ul>
           </div> */}

          {/* Internship Status */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-400">
                <th className="border border-gray-300 p-2 text-left">Internship</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Render Accepted Internships */}
              {user.accepted.map((id) => (
                <tr key={`accepted-${id}`}>
                  <td className="border border-gray-300 p-2">Internship ID: {id}</td>
                  <td className="border border-gray-300 p-2"><button className="font-semibold bg-green-600 px-2 py-1 rounded text-white">Accepted</button></td>
                </tr>
              ))}

              {/* Render Rejected Internships */}
              {user.rejected.map((id) => (
                <tr key={id}>
                  <td className="border border-gray-300 p-2">Internship ID #{id}</td>
                  <td className="border border-gray-300 p-2"><button className="font-semibold bg-red-600 px-2 py-1 rounded text-white">Rejected</button></td>
                </tr>
              ))}

              {/* Render Internships in Review */}
              {user.inReview.map((id) => (
                <tr key={id}>
                  <td className="border border-gray-300 p-2">Internship ID #{id}</td>
                  <td className="border border-gray-300 p-2"><button className="font-semibold bg-yellow-600 px-2 py-1 rounded text-white">In Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Explore Internships Link */}
          <div className="mt-[60px] flex justify-center items-center">
            <Link href="/internships" className="font-semibold bg-blue-400 px-4 py-2 rounded text-white">
              Explore Internships
            </Link>
          </div>

        </div>
      )}

      {/* Display error message if any */}
      {error && (
        <div className="container mx-auto mt-8 text-red-500 font-bold">
          Error fetching user details: {error}
        </div>
      )}
    </>
  );
}