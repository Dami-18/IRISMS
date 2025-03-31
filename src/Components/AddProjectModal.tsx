"use client";

import { useState } from "react";

interface AddProjectModalProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

const AddProjectModal = ({ onClose, onProjectAdded }: AddProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    topics: "",
    stipend: "",
    duration: "",
    mode: "remote",
    location: "",
    eligibility: "",
    prerequisites: "",
    projectDesc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      topics: formData.topics.split(",").map((topic) => topic.trim()),
      duration: parseInt(formData.duration),
    };

    try {
      const res = await fetch("/api/addProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // also send cookies to know which prof hehe
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add project");
      }

      console.log("Project added successfully!");
      onClose();
      onProjectAdded(); // To refresh projects
    } catch (err) {
      console.log(
        err instanceof Error ? err.message : "Unknown error occurred"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-auto transform transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
          Add New Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              required
              id="name"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topics" className="block text-sm font-medium text-gray-700">
              Topics (comma-separated)
            </label>
            <input
              required
              id="topics"
              name="topics"
              placeholder="Topics (comma-separated)"
              value={formData.topics}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
              Stipend
            </label>
            <input
              required
              id="stipend"
              name="stipend"
              placeholder="Stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (months)
            </label>
            <input
              required
              type="number"
              id="duration"
              name="duration"
              placeholder="Duration (months)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
              Mode
            </label>
            <select
              required
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              required
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700">
              Eligibility Criteria
            </label>
            <textarea
              required
              id="eligibility"
              name="eligibility"
              placeholder="Eligibility Criteria"
              value={formData.eligibility}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">
              Prerequisites
            </label>
            <textarea
              required
              id="prerequisites"
              name="prerequisites"
              placeholder="Prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700">
              Description of the Project
            </label>
            <textarea
              required
              id="projectDesc"
              name="projectDesc"
              placeholder="Description of the Project"
              value={formData.projectDesc}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition duration-200 ease-in-out"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;