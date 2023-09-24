"use client";
import { getData, postData } from "@/utils/Api";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quiz = () => {
  //States for quiz
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [quizData, setQuizData] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //When user hover on an option
  const handleOptionHover = (optionIndex: any) => {
    const optionElements = document.querySelectorAll<HTMLElement>(".option"); // Get all option elements
    optionElements.forEach((element, index) => {
      // Loop through all option elements
      if (index === optionIndex) {
        // If index matches with hovered option index then add border
        element.style.border = "1px solid blue";
      } else {
        // If index does not match with hovered option index then remove border
        element.style.border = "1px solid #ccc";
      }
    });
  };

  //When user click on an option
  const handleOptionClick = (questionIndex: number, optionIndex: number) => {
    if (quizData[questionIndex].isAnsweredIndex === undefined) {
      // If question is not answered
      quizData[questionIndex].isAnsweredIndex = optionIndex;

      // Find if the selected option is correct or not
      const isCorrect = quizData[questionIndex].answers[optionIndex].isCorrect;

      // Implement background color change based on correctness
      const optionElements = document.querySelectorAll<HTMLElement>(".option");
      optionElements.forEach((element, index) => {
        if (index === optionIndex) {
          if (isCorrect) {
            setTotalCorrect(totalCorrect + 1);
            element.style.backgroundColor = "green"; // Correct answer turns green
          } else {
            element.style.backgroundColor = "red"; // Incorrect answer turns red
          }
        } else {
          element.style.backgroundColor = "white"; // Reset background color for other options
        }
      });
    }
  };

  //Formate time to mm:ss
  function formatTime(seconds: any) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  //UseEffect to update total time
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime]);

  //UseEffect to get all flash cards
  useEffect(() => {
    getAllFlashCards();
  }, []);

  //Get all flash cards
  const getAllFlashCards = async () => {
    let quiz_Id = JSON.parse(localStorage.getItem("quiz_Id") || "");
    setIsLoading(true);
    let user = JSON.parse(localStorage.getItem("userData") || "");
    try {
      const response = await getData(
        `all_flashCards?email=${user.email}&categorySet=${quiz_Id}`
      );
      if (response.success) {
        setQuizData(response.data);
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  //When user click on finish button
  const onFinish = async () => {
    let userData = JSON.parse(localStorage.getItem("userData") || "");

    let payload = {
      score: totalCorrect,
      email: userData.email,
      time: formatTime(totalTime),
    };
    try {
      const response = await postData("quiz", payload);
      if (response.success) {
        toast.success(response.message);
        setIsQuizSubmitted(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //When user click on next button
  const onNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      // If current question index is less than total questions then increment current question index
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  //When user click on previous button
  const onPrevious = () => {
    if (currentQuestionIndex > 0) {
      //if array length is greater than zero then decrement current question index
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      {/* if quiz is not submitted then show this UI */}
      {!isQuizSubmitted ? (
        <div className="container mx-auto p-4 flex-1 min-h-screen bg-white">
          <ToastContainer position="top-center" autoClose={1000} />
          <h1 className="text-2xl font-semibold mb-4">Quiz</h1>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Total Correct: {totalCorrect}
            </h2>
            <h2 className="text-xl font-semibold">
              Total Time: {formatTime(totalTime)}
            </h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {quizData[currentQuestionIndex]?.question}
            </h2>
            <ul>
              {quizData[currentQuestionIndex]?.answers.map(
                (answer: any, optionIndex: number) => (
                  <li
                    key={optionIndex}
                    className={`option mb-2 p-2 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                      selectedAnswers[currentQuestionIndex] === undefined
                        ? "selectable"
                        : ""
                    }`}
                    onMouseEnter={() => handleOptionHover(optionIndex)}
                    onMouseLeave={() => handleOptionHover(null)}
                    onClick={() =>
                      handleOptionClick(currentQuestionIndex, optionIndex)
                    }
                    style={{
                      backgroundColor:
                        quizData[currentQuestionIndex].isAnsweredIndex ===
                        optionIndex
                          ? quizData[currentQuestionIndex].answers[optionIndex]
                              .isCorrect
                            ? "green"
                            : "red"
                          : "white",
                      border: "1px solid #ccc",
                    }}
                  >
                    {answer.text}
                  </li>
                )
              )}
            </ul>
          </div>
          {/* ))} */}
          <div className="justify-between items-center flex">
            <button
              onClick={onPrevious}
              className="m-5 bg-blue-500 pr-8 pl-8 rounded pt-2 pb-2 hover:cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={onFinish}
              className="m-5 bg-blue-500 pr-8 pl-8 rounded pt-2 pb-2 hover:cursor-pointer"
            >
              Finish
            </button>
            <button
              onClick={onNext}
              className="m-5 bg-blue-500 pr-8 pl-8 rounded pt-2 pb-2 hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // when quiz is submitted then show this UI
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
          <p className="text-3xl font-bold mb-4">
            Your Quiz has been submitted successfully
          </p>
          <p className="text-lg text-gray-600">Thank you for taking the quiz</p>
          <p className="text-lg text-gray-600">
            <span className="text-green-500 font-bold">
              You scored {totalCorrect} out of {quizData.length}
            </span>
          </p>
          <Link
            href="/screens/home"
            className="text-blue-500 hover:underline mt-4"
          >
            Click here to go back to the home page
          </Link>
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
    </>
  );
};

export default Quiz;
