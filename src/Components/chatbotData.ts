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
      {
        id: "internships-list",
        text: "Available Research Internships",
        nextMessage: "Here are some of the available research internships:",
        children: [
          {
            id: "natural-interaction-systems",
            text: "Natural Interaction Systems for Smart Devices",
            nextMessage:
              "Faculty: Debasis Samanta\nOrganization: IIT Kharagpur\nTopics: Human-Computer Interaction, Speech Recognition, Gesture Recognition, Machine Learning\nMode: Onsite\nStipend: ₹15,000 per month\nDuration: 8 months",
          },
          {
            id: "early-disease-detection",
            text: "Machine Learning for Early Disease Detection",
            nextMessage:
              "Faculty: Debasis Samanta\nOrganization: IIT Kharagpur\nTopics: Machine Learning, Predictive Analytics, Healthcare Data\nMode: Onsite\nStipend: ₹10,000 per month\nDuration: 10 months",
          },
          {
            id: "vulnerability-detection",
            text: "Automated Vulnerability Detection in Web Applications",
            nextMessage:
              "Faculty: Jibesh Patra\nOrganization: SecureLabs, IIT Bombay\nTopics: Software Security, Vulnerability Detection, Penetration Testing\nMode: Onsite\nStipend: ₹20,000 per month\nDuration: 6 months",
          },
          {
            id: "threat-intelligence",
            text: "NLP-Based Threat Intelligence System",
            nextMessage:
              "Faculty: Jibesh Patra\nOrganization: IIT Kanpur\nTopics: Natural Language Processing (NLP), Cybersecurity, Text Mining\nMode: Remote\nStipend: ₹12,000 per month\nDuration: 4 months",
          },
          {
            id: "community-detection",
            text: "Identifying Communities in Complex Networks",
            nextMessage:
              "Faculty: Animesh Mukherjee\nOrganization: IIT Kharagpur\nTopics: Complex Networks, Community Detection, Machine Learning\nMode: Onsite\nStipend: ₹14,000 per month\nDuration: 6 months",
          },
          {
            id: "path-planning",
            text: "AI-Powered Path Planning for Autonomous Vehicles",
            nextMessage:
              "Faculty: Justin Solomon\nOrganization: AI Lab, MIT\nTopics: Artificial Intelligence, Robotics, Path Planning, Reinforcement Learning\nMode: Hybrid\nStipend: ₹25,000 per month\nDuration: 6 months",
          },
          {
            id: "multi-robot-coordination",
            text: "Consensus-Based Coordination in Multi-Robot Networks",
            nextMessage:
              "Faculty: Stephanie Gil\nOrganization: Robotics Lab, Harvard University\nTopics: Networked Robotics, Multi-Robot Control, Distributed Systems\nMode: Remote\nStipend: ₹15,000 per month\nDuration: 6 months",
          },
        ],
      },
    ],
  },
];
