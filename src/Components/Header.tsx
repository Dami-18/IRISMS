"use client";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { logout } from "auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function Header({
  isStudent = false,
  isAdmin = false,
  isProf = false,
}: {
  isStudent?: boolean;
  isAdmin?: boolean;
  isProf?: boolean;
}) {
  if (!isStudent && !isProf && !isAdmin)
    return (
      <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <Link
          className="text-2xl font-bold text-yellow-600 transform transition duration-500 hover:scale-105"
          href="/"
        >
          IRISMS
        </Link>
      </header>
    );
  const [profDetails, setProfDetails] = useState<any>(null);

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
    } catch (err) {
      console.error(err);
    }
  };

  if (isProf) {
    useEffect(() => {
      fetchProfDetails();
    }, []);
  }

  return (
    <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
      <Link
        className="text-2xl font-bold text-yellow-600 transform transition duration-500 hover:scale-105"
        href="/"
      >
        IRISMS
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href={
            isStudent
              ? "/dashboard-students"
              : isAdmin
              ? "/admin-dashboard"
              : "/dashboard-faculty"
          }
          className="text-yellow-100 hover:text-gray-300"
        >
          Home
        </Link>
        {isStudent && (
          <Link
            href="/internships"
            className="text-yellow-100 hover:text-gray-300"
          >
            Internships
          </Link>
        )}

        {isStudent && (
          <Link
            href="/scholarships"
            className="text-yellow-100 hover:text-gray-300"
          >
            Scholarships
          </Link>
        )}

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="px-3 py-2 bg-gray-700 rounded text-yellow-100">
            Profile ▾
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-black rounded shadow-lg z-10">
            {isStudent && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                  >
                    My Profile
                  </Link>
                )}
              </Menu.Item>
            )}

            {isProf && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/profile-faculty/${profDetails.uid}`}
                    className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                  >
                    My Profile
                  </Link>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`w-full text-left px-4 py-2 ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={async () => {
                    const id = toast.loading("Logging out ... ");
                    const res = await logout();
                    if (res.success === true) {
                      toast.remove(id);
                      toast.success("Logged out successfully");
                      redirect("/login");
                    } else {
                      toast.remove(id);
                      toast.error("Logging out failed");
                    }
                  }}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </nav>
    </header>
  );
}
