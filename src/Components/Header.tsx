"use client";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { logout } from "auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function Header({ isStudent }: { isStudent?: boolean }) {
  if (isStudent === undefined) return <></>;
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link href="/">IRISMS</Link>
      </div>
      <nav className="flex items-center gap-6">
        <Link
          href={isStudent ? "/dashboard-students" : "/dashboard-faculty"}
          className="hover:text-gray-300"
        >
          Home
        </Link>
        {isStudent && (
          <Link href="/internships" className="hover:text-gray-300">
            Internships
          </Link>
        )}

        {isStudent && (
          <Link href="/scholarships" className="hover:text-gray-300">
            Scholarships
          </Link>
        )}

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="px-3 py-2 bg-gray-700 rounded">
            Profile ▾
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-black rounded shadow-lg z-10">
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
