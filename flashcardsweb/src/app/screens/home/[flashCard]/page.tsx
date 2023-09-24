"use client";
import { getData, postData } from "@/utils/Api";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlashCard(props: any) {
  // States for add flashcard
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<any>(false);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<any>(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<any>(null);
  const [flashcards, setFlashcards] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState<any>(false);
  const [editIndex, setEditIndex] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let categoryName = JSON.parse(localStorage.getItem("category") || "");

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value);
  };

  //when answer is changed the new answer is set
  const handleAnswerChange = (e: any, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index: any) => {
    setCorrectAnswer(index);
  };

  //when edit button is pressed
  const editFlashcard = (index: number) => {
    console.log("Pressed");
    //find the selectedFlash card
    const selectedFlashcard = flashcards[index]; // Get the selected flashcard
    setQuestion(selectedFlashcard.question);
    setAnswers(selectedFlashcard.answers.map((answer: any) => answer.text)); // Set the answers
    setCorrectAnswer(
      selectedFlashcard.answers.findIndex((answer: any) => answer.isCorrect)
    );
    setIsEditMode(true);
    setEditIndex(index);
    setIsAddPopupOpen(true);
  };
  const closeEditPopup = () => {
    setIsAddPopupOpen(false);
  };

  //when add flashcard button is pressed
  const addFlashcard = async () => {
    let user = JSON.parse(localStorage.getItem("userData") || ""); // Get user data from local storage
    let categorySet = JSON.parse(localStorage.getItem("category") || ""); // Get category data from local storage

    // Check if question, answers, and correct answer are provided
    if (
      question &&
      answers.every((answer: string) => answer !== "") &&
      correctAnswer !== null
    ) {
      // Create a new answers array with the correct answer marked
      const newAnswers = answers.map((answer: any, index: number) => ({
        text: answer,
        isCorrect: index === correctAnswer,
      }));
      // Only add a flashcard if the question, answers, and correct answer are provided
      const newFlashcard = {
        categorySet: categorySet,
        email: user.email,
        question,
        answers: newAnswers,
      };
      try {
        // If edit mode is true then update the flashcard
        if (isEditMode && editIndex !== null) {
          const editObject = {
            ...newFlashcard,
            _id: flashcards[editIndex]._id,
          };
          const response = await postData("update_flashCard", editObject);
          if (response.success) {
            const updatedFlashcards = [...flashcards];
            updatedFlashcards[editIndex] = editObject;
            setFlashcards(updatedFlashcards);
            closeEditPopup();
          } else {
            toast.error(response.message);
          }
        } else {
          const response = await postData("add_flashcard", newFlashcard);

          if (response.success) {
            toast.success(response.message);
            setFlashcards([...flashcards, response.data]);
          } else {
            toast.error(response.message);
          }
        }
        setQuestion("");
        setAnswers(["", "", "", ""]);
        setCorrectAnswer(null);
        setIsAddPopupOpen(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please fill out all fields and select the correct answer.");
    }
  };

  useEffect(() => {
    if (props.params.flashCard) {
      // If flashcard is present in the url then get the flashcard
      getFlashcard();
    }
  }, []);

  // Function for getting flashcard
  const getFlashcard = async () => {
    setIsLoading(true);
    let user = JSON.parse(localStorage.getItem("userData") || "");
    try {
      const response = await getData(
        `get_flashcard?email=${user.email}&categorySet=${props.params.flashCard}`
      );
      if (response.success) {
        setFlashcards(response.data);
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const deleteFlashCard = async (id: any) => {
    // show confirmation popup
    const confirmation = window.confirm(
      "Are you sure you want to delete this flashcard?"
    );

    // If user confirms then delete the flashcard
    if (confirmation) {
      try {
        const response = await getData(`delete_flashCard?_id=${id}`);
        if (response.success) {
          const updatedFlashcards = flashcards.filter(
            (flashcard: any) => flashcard._id !== id
          );
          setFlashcards(updatedFlashcards);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-gray-200">
      <ToastContainer position="top-center" autoClose={1000} />

      <div className="flex justify-between items-center p-4 bg-gray-200">
        <Link href="/screens/home"> 
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Home 
          </button>
        </Link> </div>
		
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={openAddPopup}
        >
          Add Flashcard
        </button>
        <div className="flex items-center">
          <p className="mr-2 text-2xl font-bold text-blue-500">
            {categoryName}
          </p>
        </div>
        <Link href="/screens/home/quiz">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Quiz
          </button>
        </Link>
      </div>

      {isAddPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-4 w-96 rounded-lg shadow-md z-20">
            <h2 className="text-xl font-semibold mb-4">Add Flashcard</h2>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Question
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your question"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>
            {answers.map((answer: any, index: number) => (
              <div key={index} className="mb-2">
                {/* <label className="block text-gray-600 font-semibold mb-2">{`Answer ${
                  index + 1
                }`}</label> */}
                <input
                  type="text"
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                  placeholder={`Enter answer ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
                <label className="inline-block text-gray-600 font-semibold ml-2">
                  Correct Answer
                  <input
                    type="radio"
                    value={index}
                    className="ml-2"
                    checked={correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={addFlashcard}
            >
              Add Flashcard
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-2"
              onClick={closeAddPopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {flashcards.length === 0 ? (
        <div className="flex-1 bg-white flex min-h-screen justify-center items-center">
          <p className="text-4xl text-red-600 font-bold">No Flashcard</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((flashcard: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <div className="justify-end flex items-center">
                <button
                  onClick={() => editFlashcard(index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-6"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFlashCard(flashcard._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
              <h2 className="text-xl font-semibold mb-2">Question:</h2>
              <p className="mb-4">{flashcard.question}</p>
              <h2 className="text-xl font-semibold mb-2">Answers:</h2>
              <ul>
                {flashcard.answers.map((answer: any, answerIndex: number) => (
                  <li
                    key={answerIndex}
                    className={`${
                      answer.isCorrect
                        ? "text-green-500 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {answer.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
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
    </div>
  );
}
