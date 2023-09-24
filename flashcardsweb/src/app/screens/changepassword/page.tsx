// Import necessary modules
"use client";
import Link from "next/link";
import React, { useState, useContext } from "react";
import Home from "../home/page";
import { postData } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

// Define the page component
const page = () => {
  // Set up state variables for the change password form
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [cNewPassword, setCNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Change password funtion
  const handleSubmit = async () => {
    // Check if all fields are filled out
    if (!email && !password && !newPassword && !cNewPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    // Check if new password matches confirmed new password
    if (newPassword !== cNewPassword) {
      toast.error("Password does not match");
      return;
    }

    // Send a POST request to the server with the email, password, and new password
    if (email && password) {
      const payload = {
        email,
        password,
        newPassword,
      };
      try {
        setIsLoading(true);
        let response = await postData("change_password", payload);

        // If the request is successful, redirect to the login page and display a success message
        if (response.success) {
          router.push("/screens/login");
          toast.success(response.message);
          setEmail("");
          setPassword("");
          setNewPassword("");
          setCNewPassword("");
        } else {
          // If the request fails, display an error message
          toast.error(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    }
  };

  // Render the change password form
  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Change your password</h1>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Confirm new Password
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Confirm new Password"
              value={cNewPassword}
              onChange={(e) => setCNewPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default page;