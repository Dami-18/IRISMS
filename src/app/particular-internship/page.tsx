// in the onClick handler, we will first call api/user to get user details from token and then call another api/apply which adds the user id to the list of applied students in db

// implement fetch Internship details from a unique id passed to internship function as a prop
"use client"

const ExampleInternship = {
  title: "ML INTERNSHiP",
  name: "Jibby",
  organization: "kgpkgpggkpgkpgk",
  description: "This is the description",
  skills_req: ["ML", "Coding", "etc etc"],
  email: "krehguwhefu2@edu.com",
  type: "onsite",
  funded: "yes",
  duration: "3 Months",
};

const Internship = () => {
  const applyOnClick = async() => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // for including cookies
      })

      const {message, data} = await res.json();

      const result = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: 1, // hardcoding it for now, need some handling of internship to do this also
          studentId: data.id,
          email: data.email,
        })
      });

      if(result.status==200){
        // show some react hot toast for success and change the apply buttton appearance
      }
    }
    catch(error){
      console.error("Unexpected error:", error);
      // or show some react hot toast for error
    }
  }
  return (
    <div className="m-12  bg-yellow-100 hover:bg-green-100 hover:rounded-4xl transition-all rounded-2xl">
      {/* MY SUGGESTION: upon submitting, send a request to backend to update the details but set action attribute to /dashboard  and pop up a modal on dashboard called Thank you for Applying (in green color must) */}
      <div className="text-2xl p-8">
        Project Title: {ExampleInternship.title}
      </div>{" "}
      <div className="text-xl p-8">Faculty Name: {ExampleInternship.name}</div>{" "}
      <div className="text-xl p-8">
        Organization: {ExampleInternship.organization}
      </div>{" "}
      <div className="p-8">
        Project Description: {ExampleInternship.description}
      </div>
      <div>
        CV BULLSHIT
        <button
          onClick={applyOnClick}
          type="button"
          className="pt-1 pb-1 pl-8 pr-8 m-12 rounded-2xl block border hover:bg-green-300"
        >
          Apply
        </button>
        <button // reset for what??
          type="reset"
          className="pt-1 pb-1 pl-8 pr-8 m-12 rounded-2xl border hover:bg-red-500"
        >
          Reset
        </button>
      </div>
      {/* onclick should trigger the logic that passes a request to db that user has applied and should appear that request in the faculty's  */}
      {/*also the logic to gray out the apply button or whatever tf we want to do with it */}
    </div>
  );
};

export default Internship;
