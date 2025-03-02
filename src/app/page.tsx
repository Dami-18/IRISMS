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
          router.push("/login");
        }}
      >
        Login
      </button>

      {/* Register Button */}
      <button
        className="text-blue-200 m-12 p-12 borderborder-amber-200"
        onClick={() => {
          // push and replace both methods are available, not yet decided what to choose
          router.push("/register");
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Home;
