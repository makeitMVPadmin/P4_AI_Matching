import React, { useState, useEffect } from "react";
import "./Roadmap.scss";
import { ReactComponent as RoadmapSvg } from "../../assets/images/roadmapBackground.svg";
import { ReactComponent as Goal1Icon } from "../../assets/icons/roadmapIcon1.svg";
import { ReactComponent as Goal2Icon } from "../../assets/icons/roadmapIcon2.svg";
import { ReactComponent as Goal3Icon } from "../../assets/icons/roadmapIcon3.svg";
import { ReactComponent as Goal4Icon } from "../../assets/icons/roadmapIcon4.svg";
import { ReactComponent as Goal5Icon } from "../../assets/icons/roadmapIcon5.svg";
import Modal from "react-modal";
import { PopUpModal, PopUpStyle } from "../../components/PopUpModal/PopUpModal";
import GoalComponent from "../GoalComponent/GoalComponent";
import GoalPopup from "../GoalPopup/GoalPopup";
import user1Picture from "../../assets/images/user1.png";
import user2Picture from "../../assets/images/user2.png";
// import { callOpenAiApi } from "../../utils/Functions/openaiFunctions";
// import LoadingPage from "../LoadingPage/LoadingPage";

const Roadmap = () => {
  const [activeGoal, setActiveGoal] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [hovering, setHovering] = useState(null);

  const [user1Pic, setUser1Pic] = useState(user1Picture); //replace user1 with null instead of image placeholder
  const [user2Pic, setUser2Pic] = useState(user2Picture); //replace user2 with null instead of image placeholder

  const [user1Name, setUser1Name] = useState("User1");
  const [user2Name, setUser2Name] = useState("User2");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const [savedGoals, setSavedGoals] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });

  // const [goals, setGoals] = useState(null);
  // const [loadingPage, setLoadingPage] = useState(true);

  // if (goals){
  //   setLoadingPage(true);
  // }
  // useEffect(() => {
  //   console.log("aicall");
  //   const aiApiCallData = async () => {
  //     console.log("aicall111");

  //     const userA = { firstName: "Alice", skills: ["JavaScript", "React"] };
  //     const userB = { firstName: "Bob", skills: ["Python", "Django"] };
  //     const project = "building a web application";

  //     try {
  //       console.log("aicall122");

  //       const data = await callOpenAiApi(userA, userB, project);
  //       console.log(data.goals);
  //       setGoals(data.goals);
  //       setLoadingPage(false);
  //       // console.log("loading");
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   aiApiCallData();
  // }, []);

  // CALL BACKEND FUNCTION: Get Matches
  // Use the data of only the most recent match

  // CALL BACKEND FUNCTION: Get User
  // Get both users based on user id from the match table

  // CALL BACKEND FUNCTION: Get UserGoalCompletion
  // Get UserGoalCompletion data with match id (all 5 records)

  // CALL BACKEND FUNCTION: Get Goals
  // Get Goals from UserGoalCompletion goal id

  // CALL BACKEND FUNCTION: Get UserSubtaskCompletion
  // Get UserSubtaskCompletion data with goal id (all 5 records)

  // CALL BACKEND FUNCTION: Get Subtasks
  // Get Goals from UserSubtaskCompletion subtask id

  //mock roadmap data
  const goalsData = [
    {
      goal: "Attend 4 meetings",
      subtasks: [
        "Schedule & attend 1 accountability meeting",
        "Attend 2 accountability meetings",
        "Attend 3 accountability meetings",
        "Attend all 4 accountability meetings",
      ],
    },
    {
      goal: "Design and implement the frontend of the web application using JavaScript and React",
      subtasks: [
        "Discuss and finalize the UI/UX design for the application",
        "Break down the design into reusable React components",
        "Implement the React components using JavaScript",
        "Test the components individually and as a whole to ensure they work as expected",
      ],
    },
    {
      goal: "Develop the backend of the web application using Python and Django",
      subtasks: [
        "Design the database schema and establish the necessary Django models",
        "Implement the necessary views and templates in Django",
        "Integrate the Django backend with the React frontend",
        "Test the backend functionality and ensure it works with the frontend",
      ],
    },
    {
      goal: "Deploy the web application",
      subtasks: [
        "Choose a suitable hosting platform for the application",
        "Configure the deployment settings for both frontend and backend",
        "Deploy the application and test it in the production environment",
        "Monitor the application performance and fix any issues that arise",
      ],
    },
    {
      goal: "Attend 4 meetings to go over what you’ve learned",
      subtasks: [
        "Schedule & attend 1 accountability meeting",
        "Attend 2 accountability meetings",
        "Attend 3 accountability meetings",
        "Attend all 4 accountability meetings",
      ],
    },
  ];
  console.log(goalsData[0].subtasks);

  // This object is temporary and only here to provide mock data to show the functionality of the popup
  const mockMatchData = {
    goal1Task: "Goal 1 task",
    goal2Task: "Goal 2 task",
    goal3Task: "Goal 3 task",
    goal4Task: "Goal 4 task",
    goal5Task: "Goal 5 task",
    user1Picture: user1Picture,
    user2Picture: user2Picture,
  };

  // useEffect(() => {
  //   // Simulating data fetch from backend
  //   setTimeout(() => {
  //     setUser1Name("Diana");
  //     setUser2Name("Kerry");
  //     setCompletionPercentage(20);
  //   }, 1000);
  // }, []);

  const handleGoalClickModal = (goalNumber) => {
    setActiveGoal(goalNumber);
    setModalOpen(true);
  };

  const handleCloseGoalClickModal = () => {
    setModalOpen(false);
    setActiveGoal(null);
  };

  const handleSaveChanges = (goalNumber, subtasks) => {
    setSavedGoals((prev) => ({
      ...prev,
      [goalNumber]: subtasks,
    }));
    console.log(`Saved changes for Goal ${goalNumber}:`, subtasks);

    const totalSubtasks = Object.values(goalsData).reduce(
      (acc, goal) => acc + goal.subtasks.length,
      0
    );
    const completedSubtasks =
      Object.values(savedGoals).reduce(
        (acc, goal) => acc + Object.values(goal).filter(Boolean).length,
        0
      ) + Object.values(subtasks).filter(Boolean).length;
    const newPercentage = Math.round((completedSubtasks / totalSubtasks) * 100);
    setCompletionPercentage(newPercentage);

    setModalOpen(false);
    setActiveGoal(null);
  };

  const renderModalComponent = () => {
    if (!activeGoal) return null;

    return (
      <Modal
        id="promptpage__linkedinpost-modal"
        isOpen={isModalOpen}
        onRequestClose={handleCloseGoalClickModal}
        ariaHideApp={false}
        className="modalStyle"
        overlayClassName="modalOverlay"
        shouldCloseOnOverlayClick={false}
      >
        <>
          <PopUpModal title={{}} closeButtonAction={handleCloseGoalClickModal}>
            <GoalComponent
              goalNumber={activeGoal}
              goalPrompt={activeGoal && goalsData[activeGoal - 1].goal}
              subtasks={activeGoal && goalsData[activeGoal - 1].subtasks}
              onSaveChanges={handleSaveChanges}
              savedProgress={savedGoals[activeGoal]}
              onClose={handleCloseGoalClickModal}
            />
          </PopUpModal>
        </>
      </Modal>
    );
  };

  // if (loadingPage) {
  //   return (
  //     <div className="roadmap-container">
  //       <LoadingPage />
  //     </div>
  //   )
  // }

  return (
    <div className="roadmap-container">
      <div className="svg-container">
        <RoadmapSvg />
        <div className="goals-progress-box">
          <div className="goals-progress-content">
            {user1Name}'s and {user2Name}'s partnership:
          </div>
          <div className="goals-progress-percentage">
            {completionPercentage}% completed
          </div>
        </div>

        <div className="svg-container__matched">
          <div className="svg-container__matched__images">
            <img
              src={user1Pic}
              alt="user1 avatar "
              className="svg-container__matched__user"
            />
            <img
              src={user2Pic}
              alt="user2 avatar "
              className="svg-container__matched__user"
            />
          </div>
        </div>

        {renderModalComponent()}

        {[1, 2, 3, 4, 5].map((goalNumber) => (
          <button
            key={goalNumber}
            onMouseEnter={() => setHovering(goalNumber)}
            onMouseLeave={() => setHovering(null)}
            className={`goal-button goal${goalNumber}`}
            onClick={() => handleGoalClickModal(goalNumber)}
          >
            {hovering === goalNumber && (
              <GoalPopup
                offsetX={`${9.5 - goalNumber * 1.1}rem`}
                offsetY={`${9.5 - goalNumber * 1.1}rem`}
                number={goalNumber}
                task={mockMatchData[`goal${goalNumber}Task`]}
                locked={goalNumber !== 1}
                user1Complete={false}
                user2Complete={false}
                user1Picture={mockMatchData.user1Picture}
                user2Picture={mockMatchData.user2Picture}
              />
            )}
            <div className="goal-icon-container">
              {goalNumber === 1 && <Goal1Icon />}
              {goalNumber === 2 && <Goal2Icon />}
              {goalNumber === 3 && <Goal3Icon />}
              {goalNumber === 4 && <Goal4Icon />}
              {goalNumber === 5 && <Goal5Icon />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
