"use client";
import React, { useState, useContext, useEffect } from "react";
import FlashCard from "./[flashCard]/page";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, postData } from "@/utils/Api";
import { RotatingLines } from "react-loader-spinner";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

type CategoriesData = string[];
type EditIndex = number | null;
type IsItemPressed = number | null;

export default function Home() {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState<any>([]);
  const [singleCategory, setSingleCategory] = useState<string>("");
  const [editIndex, setEditIndex] = useState<EditIndex>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // When clicked on add button
  /**
   * Function that adds or updates a category based on the value of editIndex.
   */
  const onAdd = async () => {
    // Check if singleCategory is not empty
    if (singleCategory) {
      // If editIndex is not null then update the category
      if (editIndex !== null) {
        try {
          // creating object for payload
          const payload = {
            _id: categoriesData[editIndex]._id,
            name: singleCategory,
          };
          const response = await postData("update_category", payload); //
          console.log(response);
          if (response.success) {
            const updatedCategories = [...categoriesData];
            updatedCategories[editIndex].name = singleCategory;
            setCategoriesData(updatedCategories);
            setEditIndex(null); // Set editIndex to null
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
      // If editIndex is null then add the category
      else {
        try {
          let userData = JSON.parse(localStorage.getItem("userData") || ""); // Get user data from local storage
          const payload = {
            owner: userData.email,
            name: singleCategory,
          };
          const response = await postData("add_category", payload);
          console.log(response.data);
          if (response.success) {
            setCategoriesData([...categoriesData, response.data]);
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
      setSingleCategory("");
    } else {
      toast.error("Please enter a category");
    }
  };

  // Function for getting categories
  const getCategories = async () => {
    let user = JSON.parse(localStorage.getItem("userData") || ""); // Get user data from local storage
    setIsLoading(true); // Show loader
    try {
      const response = await getData(`get_category?email=${user.email}`); // Call get category api
      console.log(response);
      setIsLoading(false);
      if (response.success) {
        setCategoriesData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  // useffect for getting categories
  useEffect(() => {
    getCategories();
  }, []);
  // When clicked on edit button
  const onEdit = (index: number) => {
    setSingleCategory(categoriesData[index].name); // Set the category name in singleCategory state
    setEditIndex(index); // Set the index in editIndex state
  };

  // When clicked on delete button
  const onDelete = async (index: number) => {
    // Show confirmation dialog
    const confirmation = window.confirm(
      `Are you sure you want to delete the category "${categoriesData[index].name}" with it's flashCards?`
    );

    // If user confirms
    if (confirmation) {
      try {
        let payload = {
          _id: categoriesData[index]._id,
        };
        const response = await postData("delete_category", payload); // Call delete category api

        if (response.success) {
          toast.success(response.message);
          const updatedCategories = [...categoriesData]; // Copy categories data in a new array
          updatedCategories.splice(index, 1); // Remove the category from the array
          setCategoriesData(updatedCategories); // Set the new array in categoriesData state
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  // When clicked on logout button
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove user data from local storage
    router.push("/"); // Redirect to login page
  };

  // When clicked on quiz button
  const onQuiz = (index: number) => {
    localStorage.setItem("quiz_Id", JSON.stringify(categoriesData[index]._id)); // Set quiz id in local storage
    router.push(`/screens/home/quiz`); // Redirect to quiz page
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="bg-white min-h-screen flex flex-col p-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">Welcome to the Home Page</h1>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={singleCategory}
            onChange={(e) => setSingleCategory(e.target.value)}
            className="w-1/2 border p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter Category"
          />
          <button
            onClick={onAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        {categoriesData.length > 0 ? (
          <div className="overflow-y-auto">
            {categoriesData.map((item: any, index: number) => {
              console.log(item);
              return (
                <div
                  className="bg-blue-100 p-4 rounded-lg mb-4 flex justify-between items-center"
                  key={index}
                >
                  <Link
                    onClick={() =>
                      localStorage.setItem(
                        "category",
                        JSON.stringify(item.name)
                      )
                    }
                    href={{
                      pathname: `/screens/home/${item._id}`,
                    }}
                  >
                    <div className="flex items-center">
                      <p className="text-xl font-semibold">{item?.name}</p>
                      <p className="ml-4 text-gray-500">
                        ( Total Questions: {item?.flashcardCount})
                      </p>{" "}
                    </div>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onEdit(index)}
                      className="text-blue-500 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onQuiz(index)}
                      className="text-green-500 cursor-pointer"
                    >
                      Quiz
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-4xl text-gray-500">No Categories Added Yet</p>
          </div>
        )}
      </div>
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
    </>
  );
}