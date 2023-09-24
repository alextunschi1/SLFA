"use client";

import { postData } from "@/utils/Api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const router = useRouter();
  //States for register
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Register funtion
  const handleLogin = async () => {
    //Check if all fields are not empty
    if (!name && !email && !password && !cPassword) {
      toast.error("Please fill all the fields");
    }
    //Check if password and confirm password are same
    if (password !== cPassword) {
      toast.error("Password and Confirm Password does not match");
    }
    //Check if all fields is not empty
    if (name && email && password && cPassword && password === cPassword) {
      const payload = {
        name,
        email,
        password,
      };
      try {
        setIsLoading(true);
        let response = await postData("register", payload); //Call register api
        console.log(response);
        if (response.success) {
          router.push("/screens/login");
          toast.success(response.message);
          setEmail("");
          setName("");
          setPassword("");
          setCPassword("");
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              Password
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
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 items-center justify-center"
            onClick={handleLogin}
          >
            {isLoading ? (
              <div className="flex items-center justify-center absolute inset-0">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
