import "./Quiz.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nextQuestion, finishGame } from "./quizSlice";
import Options from "./Options";

export default function Quiz({ questions, maxPoints }) {
  const { question, points, answer } = useSelector((state) => state.quiz);
  const currentQuestion = questions[question];
  const dispatch = useDispatch();

  return (
    <div className="quizScreen">
      <div className="quizScreen__container">
        <h1>The React Quiz</h1>
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
          <span>07:11</span>
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
