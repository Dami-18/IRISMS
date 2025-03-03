// Welcome Screen

"use client";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    //outer div
    <div className="flex">
      {/* Login Button */}
      <button
        className="text-red-200 m-12 p-12"
        onClick={() => {
          // push and replace both methods are available, not yet decided what to choose
          router.push("/login"); // this is for client-side navigation, not backend
        }}
      >
        Login
      </button>

      {/* Register Button */}
      <button
        className="text-blue-200 m-12 p-12 borderborder-amber-200"
        onClick={() => {
          // push and replace both methods are available, not yet decided what to choose
          router.push("/register"); // this is for client-side navigation, not backend
        }}
      >
        Register
      </button>

      {/* button of student's dashboard for testing */}
      <button
        className="text-blue-200 m-12 p-12 borderborder-amber-200"
        onClick={() => {
          // push and replace both methods are available, not yet decided what to choose
          router.push("/dashboard-students"); // this is for client-side navigation, not backend
        }}
      >
        Student's Dashboard
      </button>
    </div>
  );
};

export default Home;
