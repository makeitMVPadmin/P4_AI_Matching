import "./ChallengeDetails.scss";
import { Link, useParams } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import clock from "../../assets/icons/clock.svg";
import pen from "../../assets/icons/pen.svg";
import bulb from "../../assets/icons/lightbulb.svg";
import backIcon from "../../assets/images/back.svg";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

export function ChallengeDetails() {
  const { challengeId } = useParams();

  const [challengeData, setChallengeData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getChallengeData() {
      const docRef = doc(db, "Challenges", challengeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setChallengeData(data);
      } else {
        navigate("/testPage");
      }
    }

    getChallengeData();
  }, [challengeId, navigate]);

  if (!challengeData) {
    return <div>Loading</div>;
  }

  return (
    <>
      <DashboardNavbar />
      <main className="main">
        <img
          src="https://png.pngtree.com/background/20230517/original/pngtree-what-can-a-home-computer-desk-look-like-picture-image_2625455.jpg"
          className="image"
          alt="computer on a desk"
        />

        <section className="challenge">
          <div className="overview">
            <div className="overview__difficulty">
              {challengeData.difficulty}
            </div>
            <h1 className="overview__title">{challengeData.task}</h1>
            <p className="overview__overview">
              {challengeData.detailedProblem.description}
            </p>

            <div className="overview__details">
              <div className="overview__type">
                <img src={pen} className="overview__icon" alt="pen icon" />
                <span className="overview__type-text">
                  {challengeData.category}
                </span>
              </div>
              <div className="overview__type">
                <img src={clock} className="overview__icon" alt="pen icon" />
                <span className="overview__type-text">
                  {challengeData.duration}
                </span>
              </div>
              <div className="overview__type">
                <img src={bulb} className="overview__icon" alt="pen icon" />
                <span className="overview__type-text">
                  VS Code, {challengeData.category}
                </span>
              </div>
            </div>

            <div className="objectives">
              <h2 className="objectives__title">Constraints</h2>
              <ul className="objectives__list">
                {challengeData.detailedProblem.constraints.map(
                  (constraint, index) => {
                    return (
                      <li className="objectives__item" key={index}>
                        {constraint}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="examples">
              <h2 className="examples__title">Examples</h2>
              <ul className="examples__list">
                {challengeData.detailedProblem.examples.map(
                  (example, index) => {
                    return (
                      <code className="examples__item" key={index}>
                        Input: {example.input} <br /> Output: {example.output}
                      </code>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="solutions">
              <h2 className="solutions__title">Solution Approach</h2>
              <ul className="solutions__list">
                {challengeData.detailedProblem.solutionApproach.map(
                  (example, index) => {
                    return (
                      <li className="solutions__item" key={index}>
                        {example}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="action">
              <Link to="/ChallengePage">
                <button className="action__button action__button--secondary">
                  <img
                    src={backIcon}
                    className="action__back-icon"
                    alt="back icon"
                  />
                  <span className="action__button-text">Back</span>
                </button>
              </Link>
              <Link to="/PairupBoard">
                <button className="action__button">Pair Up</button>
              </Link>
            </div>
          </div>

          <div className="instructions">
            <div className="instructions__step">
              <div className="instructions__chip">Complete the challenge</div>
              <ul className="instructions__list">
                <li className="instructions__item">
                  Create a solution that works with all the examples. Make sure
                  your solution adheres the all constraints given.
                </li>
              </ul>
            </div>
            <div className="instructions__step">
              <div className="instructions__chip">Submit Your Code</div>
              <ul className="instructions__list">
                <li className="instructions__item">
                  After completing the challenge, input your code into the
                  designated User Code section and click Submit.
                </li>
              </ul>
            </div>
            <div className="instructions__step">
              <div className="instructions__chip">Finalize your solution</div>
              <ul className="instructions__list">
                <li className="instructions__item">
                  After receiving feedback, implement any improvements that have
                  been suggested by your partner.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
