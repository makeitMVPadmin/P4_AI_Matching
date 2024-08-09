import "./QuizPage.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import React, { useState, Suspense } from "react";
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";
import LoadingPage from "../LoadingPage/LoadingPage";
import NoMatch from "../NoMatch/NoMatch";
import NewMatchedUsers from "../NewMatchedUsers/NewMatchedUsers";

const QuizPage = ({ currentPage, setCurrentPage }) => {
  // ADD match response prop if match algo happens after sending questions

  const [progress, setProgress] = useState(() => {
    const savedProgress = sessionStorage.getItem("progress");
    return savedProgress ? Number(savedProgress) : 0;
  });
  const onProgressChange = (answeredQuestionsCount) => {
    // Update progress based on the number of answered questions
    setProgress(answeredQuestionsCount);
    //store progress in session storage
    sessionStorage.setItem("progress", answeredQuestionsCount);
  };

  return (
    <div className="quizpage">
      <div className="quizpage__side-area">
        <ProgressBar step={progress} currentPage={currentPage} />
      </div>
      <div className="quizpage__main-container">
        <div className="quizpage__main">
          {currentPage === "quiz" && (
            <QuizQuestions
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              onProgressChange={onProgressChange}
            />
          )}
          {currentPage === "new-match" && (
            <Suspense fallback={<LoadingPage />}>
              <NewMatchedUsers
                handleBackToQuiz={() => setCurrentPage("quiz")}
                handleGoToGoal={() => setCurrentPage("roadmap")}
              />
            </Suspense>
          )}
          {currentPage === "no-match" && (
            <Suspense fallback={<LoadingPage />}>
              <NoMatch handleBackToQuiz={() => setCurrentPage("quiz")} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
