const projects = [
  {
    name: "ML INTERNSHIP",
    faculty_name: "Alakh Pande",
    email: "leslie.alexander@example.com",
    description: " This is the project description",
  },
  {
    name: "ML INTERNSHIP",
    faculty_name: "Alakh Pande",
    email: "leslie.alexander@example.com",
    description: " This is the project description",
  },
  {
    name: "ML INTERNSHIP",
    faculty_name: "Alakh Pande",
    email: "leslie.alexander@example.com",
    description: " This is the project description",
  },
];

const Internships = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <div className="flex flex-row-reverse">
        {/* Add Modals for adding projects and route for past projects*/}
        <button className="mr-12 mb-4 mt-4 ml-12 border-2 rounded-full p-4 hover:bg-green-500">
          Add a Project
        </button>
      </div>
      {projects.map((project, index) => (
        <div key={index + 1} className="flex">
          <li
            key={project.email}
            className="flex justify-between gap-x-6 py-5 bg-amber-100 border-2 rounded-xl p-12 m-12 hover:bg-green-200"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-xl font-semibold">Project {index + 1}</p>
                <p className="text-xl font-semibold">{project.name}</p>
                <p className="">{project.email}</p>
                <p className="">{project.description}</p>
              </div>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Internships;
