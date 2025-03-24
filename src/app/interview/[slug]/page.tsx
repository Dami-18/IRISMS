"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";
import React from "react";
import { useParams } from "next/navigation";

const MeetingPage = () => {
  const Params = useParams();
  const room = Params.slug;

  if (!room) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Error</h1>
        <p>Room name is missing. Please try scheduling the interview again.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Interview Meeting</h1>
      <JitsiMeeting
        roomName={room} // this gives TS error but doesn't matter for the time being
        lang="en" // english
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = "600px"; // can later change this css for better design 
          iframe.style.width = "100%";
        }}
      />
    </div>
  );
};

export default MeetingPage;
