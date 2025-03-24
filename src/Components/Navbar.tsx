"use client";
import { SetStateAction, useEffect, useState } from "react";

const Navbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleLinkClick = (link: string) => {
    setActiveTab(link);
    localStorage.setItem("activeTab", link); // Save active tab to localStorage
  };

  useEffect(() => {
    const savedactiveTab = localStorage.getItem("activeTab");
    if (savedactiveTab) {
      setActiveTab(savedactiveTab); // Restore active tab from localStorage
    }
  }, []);

  return (
    <div className="flex justify-center m-12">
      <div className="nav-pill p-4">
        <div
          className={`nav-toggle w-inline-block m-4 cursor-pointer ${
            activeTab === "internships" ? "nav-indicator-pill" : ""
          }`}
          onClick={() => handleLinkClick("internships")}
        >
          <div className="text-nav-toggle">Internships </div>
        </div>
        <div
          className={`nav-toggle w-inline-block m-4 cursor-pointer ${
            activeTab === "scholarships" ? "nav-indicator-pill" : ""
          }`}
          onClick={() => handleLinkClick("scholarships")}
        >
          <div className="text-nav-toggle">Scholarships</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
