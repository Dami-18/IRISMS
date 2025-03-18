// profile page
// logic - in the stored token after login, check the uid and check if it is prof or student and display the profile details accordingly
"use client";
import { verifyToken } from "@/../auth";
import { useState } from "react";

const Profile = () => {
  const [isProf, setIsProf] = useState(false);

  return <></>;
};
export default Profile;
// this needs to be changed and display editable details of student or prof
