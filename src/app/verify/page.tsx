"use client";
import { verify } from "auth";
import Form from "next/form";
import { NextResponse } from "next/server";
import { useState } from "react";
const email = localStorage.getItem("email");

const Verify = () => {
  if (!email) {
    return <>invalid</>;
  }
  console.log(email);

  const [otp, setOtp] = useState("");

  return (
    <div>
      <h1>Verify OTP</h1>
      <Form action={verify}>
        <label htmlFor="otp">OTP: </label>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          className=""
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </Form>
    </div>
  );
};

export default Verify;
