import { useDispatch } from "react-redux";
import { answerCorrect, answerQuestion } from "./quizSlice";
import "./Options.css";

function Options({ currentQuestion, answer }) {
  const dispatch = useDispatch();

  return (
    <div className="quiz__answers">
      {currentQuestion.options.map((option, i) => (
        <button
          className={`${i === answer ? "quiz__answered" : ""} ${
            answer !== null &&
            (i === currentQuestion.correctOption
              ? "answer__correct"
              : "answer__incorrect")
          }`}
          disabled={answer !== null}
          key={option}
          onClick={() => {
            dispatch(answerQuestion(i));
            if (i === currentQuestion.correctOption) {
              dispatch(answerCorrect(+currentQuestion.points));
            }
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
