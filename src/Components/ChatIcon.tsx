// components/ChatIcon.tsx
"use client";
import React from "react";

interface ChatIconProps {
  isVisible: boolean;
  isChatOpen: boolean;
  toggleChat: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({
  isVisible,
  isChatOpen,
  toggleChat,
}) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-300 transform ${
        isVisible && !isChatOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-90 pointer-events-none"
      }`}
      onClick={toggleChat}
    >
      <div className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatIcon;
