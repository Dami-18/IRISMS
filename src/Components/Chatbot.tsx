"use client";

// components/ChatbotComponent.tsx
import { useState, useEffect } from "react";
import { chatTree, ChatOption } from "./chatbotData";
import ChatIcon from "./ChatIcon";
import ChatModal from "./ChatModal";

export type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
};

const ChatbotComponent: React.FC = () => {
  const isVisible = true;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>(chatTree);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: "Welcome to the Integrated Research Internship and Scholarship Management System. How can I help you today?",
          isUser: false,
        },
      ]);
    }
  }, [isChatOpen, messages.length]);

  const handleOptionClick = (option: ChatOption) => {
    // Add user selection as a message
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, text: option.text, isUser: true },
    ]);

    // Add response if there is a nextMessage
    if (option.nextMessage) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: `bot-${Date.now()}`, text: option.nextMessage!, isUser: false },
        ]);
      }, 500); // Small delay to simulate thinking
    }

    // Update options to show children or reset to main menu if no children
    if (option.children && option.children.length > 0) {
      setCurrentOptions(option.children);
    } else {
      // Add a back to main menu option after a small delay
      setTimeout(() => {
        setCurrentOptions([
          {
            id: "back-to-menu",
            text: "Back to Main Menu",
            nextMessage: "What else would you like to know?",
          },
          ...chatTree,
        ]);
      }, 800);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatIcon
        isVisible={isVisible}
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
      />

      <ChatModal
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
        messages={messages}
        currentOptions={currentOptions}
        handleOptionClick={handleOptionClick}
      />
    </>
  );
};

export default ChatbotComponent;
