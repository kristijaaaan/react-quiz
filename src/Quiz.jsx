import "./Quiz.css";
import Options from "./Options";
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion, finishGame, tick } from "./quizSlice";
import { useEffect } from "react";

export default function Quiz({ maxPoints }) {
  const { questions, question, points, answer, timeLeft } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();
  const currentQuestion = questions[question];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div className="quizScreen">
      <div className="quizScreen__container">
        <h1>General Knowledge Quiz</h1>
        <div className="quiz__overview">
          <div>
            Question {question + 1}/{questions.length}
          </div>
          <div>
            {points}/{maxPoints} points
          </div>
        </div>
        <div className="quiz__main">
          <span className="quiz__question">{currentQuestion.question}</span>
          <Options currentQuestion={currentQuestion} answer={answer} />
        </div>
        <div className="quiz__footer">
          <span>
            {minutes < 10 && "0"}
            {minutes}:{seconds < 10 && "0"}
            {seconds}
          </span>
          {question < questions.length - 1
            ? answer !== null && (
                <button onClick={() => dispatch(nextQuestion())}>Next</button>
              )
            : answer !== null && (
                <button onClick={() => dispatch(finishGame())}>Finish</button>
              )}
        </div>
      </div>
    </div>
  );
}
