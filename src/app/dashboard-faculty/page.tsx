"use client";

import { useEffect, useState } from "react";
import AddProjectModal from "@/Components/AddProjectModal";
import Link from "next/link";
import Header from "@/Components/Header";

const Dashboard = () => {
  const [profDetails, setProfDetails] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchProfDetails = async () => {
    try {
      const res = await fetch("/api/prof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch professor details");

      const data = await res.json();
      setProfDetails(data.data);

      setProjects(data.data.projectsCurrent || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfDetails();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 mx-auto bg-yellow-600 text-white rounded-lg flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
        </div>
        <p className="text-xl font-medium text-indigo-700">Loading projects...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="w-16 h-16 mx-auto bg-red-500 text-white rounded-lg flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Error</h3>
        <p className="text-gray-600 text-center">{error}</p>
        <button 
          onClick={() => fetchProfDetails()}
          className="mt-6 w-full px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100">
      <Header isStudent={false} />
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Professor Info Section */}
        {profDetails && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center">
                {profDetails.profilePicture ? (
                  <img 
                    src={profDetails.profilePicture} 
                    alt={profDetails.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{`${profDetails.firstName} ${profDetails.lastName}` || 'Professor'}</h1>
                <p className="text-gray-600">{profDetails.specialization || 'Department of Computer Science'}</p>
                <p className="text-gray-600">{profDetails.email || ''}</p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Current Projects</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Project
          </button>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first research project.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg inline-flex items-center"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/particular-internship-faculty/${project.id}`}
              >
                <div className="bg-white rounded-xl shadow-md transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border-l-4 border-yellow-600 overflow-hidden cursor-pointer">
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-3">
                          Project {index + 1}
                        </span>
                        <h3 className="font-semibold text-xl mb-2">{project.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {project.mode}
                          </div>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {project.stipend}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onProjectAdded={() => fetchProfDetails()}
        />
      )}
    </div>
  );
};

export default Dashboard;