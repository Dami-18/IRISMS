// chatbotData.ts
export type ChatOption = {
  id: string;
  text: string;
  nextMessage?: string;
  children?: ChatOption[];
};

export const chatTree: ChatOption[] = [
  {
    id: "internships",
    text: "Research Internship Information",
    nextMessage: "What would you like to know about our research internships?",
    children: [
      {
        id: "internships-types",
        text: "Available Internship Types",
        nextMessage:
          "We offer the following types of research internships: \n\n1. Summer Research Program (8-12 weeks)\n2. Semester Research Internship (3-4 months)\n3. Year-long Research Fellowship\n4. Industry-Academia Collaborative Internships",
      },
      // More options...
    ],
  },
  // More top-level options...
];
