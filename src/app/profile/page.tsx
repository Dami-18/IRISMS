// profile page
// logic - in the stored token after login, check the uid and check if it is prof or student and display the profile details accordingly
"use client";
import { useEffect, useState } from "react";

const Profile = () => {
  const [isProf, setIsProf] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch("api/isitstudorprof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { student } = await res.json();

      if (student === true) {
        setIsProf(false);
      } else if (student === false) {
        setIsProf(true);
      }
    };

    fetchDetails();
  }, []);

  if (isProf === undefined) {
    return <>YOU'RE NOT ALLOWED</>;
  } else if (isProf === true) {
    return <>You're Prof</>;
  } else if (isProf === false) {
    return <>You're Student</>;
  }
};
export default Profile;
// this needs to be changed and display editable details of student or prof
