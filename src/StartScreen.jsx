import "./StartScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "./quizSlice";

export default function StartScreen({ maxPoints }) {
  const { points, status, highscore } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  return (
    <div className="startScreen">
      <div className="startScreen__container">
        <h1>
          Welcome to the <span>React Quiz</span>
        </h1>
        {status === "ready" && <h3>Here you can check your React knowledge</h3>}
        {status === "finished" && (
          <>
            <h4>
              You scored {points}/{maxPoints}
            </h4>
            <h3>Highscore: {highscore}</h3>
          </>
        )}
        <button className="startButton" onClick={() => dispatch(startGame())}>
          {status === "finished" ? "Play again" : "Start quiz"}
        </button>
      </div>
    </div>
  );
}
