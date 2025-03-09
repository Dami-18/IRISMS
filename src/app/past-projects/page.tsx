// Page only accessible for faculty and

const PastProjects = () => {
  const projects = [
    {
      topic: "AI-Powered Chatbot",
      interns: ["John Doe", "Jane Smith"],
      duration: "6 months",
    },
    {
      topic: "Blockchain-Based Voting System",
      interns: ["Alice Johnson", "Bob Brown"],
      duration: "8 months",
    },
    {
      topic: "IoT Smart Home Automation",
      interns: ["Charlie Davis", "Diana Evans"],
      duration: "5 months",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Past Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg shadow-lg p-6 hover:bg-gray-600 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-4">{project.topic}</h2>
              <p className="text-gray-300 mb-2">
                <span className="font-bold">Interns:</span>{" "}
                {project.interns.join(", ")}
              </p>
              <p className="text-gray-300">
                <span className="font-bold">Duration:</span> {project.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastProjects;
