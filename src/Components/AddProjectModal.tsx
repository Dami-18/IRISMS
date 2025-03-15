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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      console.log(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            required
            name="topics"
            placeholder="Topics (comma-separated)"
            value={formData.topics}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            required
            name="stipend"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            required
            type="number"
            name="duration"
            placeholder="Duration (months)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <select required name="mode" value={formData.mode} onChange={handleChange} className="border p-2 w-full rounded">
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
          </select>
          <input
            required
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            required
            name="eligibility"
            placeholder="Eligibility Criteria"
            value={formData.eligibility}
            onChange={handleChange}
            className="border p-2 w-full rounded h-[80px]"
          />
          <textarea
            required
            name="prerequisites"
            placeholder="Prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            className="border p-2 w-full rounded h-[80px]"
          />

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            
             <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit
             </button>
           </div>
         </form>
       </div>
     </div>
   );
};

export default AddProjectModal;
