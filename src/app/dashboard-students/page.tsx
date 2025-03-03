"use client"
import { useState } from "react";

export default function StudDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <>
        <header className="bg-blue-500 p-2 text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-2">
            <span className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </header>
      
      {isMenuOpen && (
        <nav className="bg-blue-400 p-4">
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-blue-100">Home</a></li>
            <li><a href="#" className="text-white hover:text-blue-100">Profile</a></li>
            <li><a href="#" className="text-white hover:text-blue-100">Settings</a></li>
          </ul>
        </nav>
      )}

        
        <div className="container mx-auto mt-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-400">
                <th className="border border-gray-300 p-2 text-left">Internship</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Software Development Internship</td>
                <td className="border border-gray-300 p-2"><button className="font-semibold bg-green-600">Accepted</button></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Data Analysis Internship</td>
                <td className="border border-gray-300 p-2"><button className="font-semibold bg-red-600">Rejected</button></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">ML Internship</td>
                <td className="border border-gray-300 p-2"><button className="font-semibold bg-yellow-600">In review</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-15 flex justify-center items-center"><button className="font-semibold bg-blue-400 px-4 py-2 rounded">Explore Internships</button></div>
      </>
    );
  }
  