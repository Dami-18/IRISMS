"use client";

// components/ChatModal.tsx
import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./Chatbot";
import { ChatOption } from "./chatbotData";

interface ChatModalProps {
  isChatOpen: boolean;
  toggleChat: () => void;
  messages: ChatMessage[];
  currentOptions: ChatOption[];
  handleOptionClick: (option: ChatOption) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isChatOpen,
  toggleChat,
  messages,
  currentOptions,
  handleOptionClick,
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-[95%] md:w-[400px] lg:w-[450px] max-h-[600px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 transform ${
        isChatOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Research & Scholarship Assistant</h3>
        <button
          onClick={toggleChat}
          className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors duration-200"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.isUser ? "flex justify-end" : "flex justify-start"
            } animate-fadeIn`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.isUser
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Chat Options */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-1 gap-2">
          {currentOptions.map((option) => (
            <button
              key={option.id}
              className="bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 px-4 py-2 rounded-lg text-left text-sm transition-all duration-200 transform hover:scale-[1.02]"
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
