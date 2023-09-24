"use client";

import Link from "next/link";
import React, { useState, useContext } from "react";
import Home from "../home/page";
import { postData } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  //States for login
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Login funtion
  const handleLogin = async () => {
    if (!email && !password) {
      toast.error("Please fill all the fields");
    }

    //Check if email and password is not empty
    if (email && password) {
      const payload = {
        email,
        password,
      };
      try {
        setIsLoading(true);
        let response = await postData("sign-in", payload); //Call login api

        if (response.success) {
          //If login success
          localStorage.setItem("userData", JSON.stringify(response.data));
          toast.success(response.message); //Show success message
          setIsLogin(true);
          router.push("/screens/home"); //Redirect to home page
        } else {
          toast.error(response.message); //Show error message
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false); //Hide loader
        toast.error("Something went wrong"); //Show error message
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0">
          {" "}
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
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold mb-4">Don't have account</p>
            <Link
              href="/screens/register"
              className="block text-center text-blue-500 font-semibold mb-4"
            >
              Register
            </Link>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
          <div className="justify-end flex">
            <Link
              href="/screens/changepassword"
              className="block text-center text-blue-500 font-semibold mb-4"
            >
              Change Password
            </Link>
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
