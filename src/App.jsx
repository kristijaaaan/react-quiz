import StartScreen from "./StartScreen";
import Quiz from "./Quiz";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchQuestions } from "./quizSlice";

export default function App() {
  const { status, questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const maxPoints = questions?.reduce(
    (acc, question) => acc + question.points,
    0
  );

  if (status === "ready" || status === "finished")
    return <StartScreen maxPoints={maxPoints} />;

  if (status === "active") return <Quiz maxPoints={maxPoints} />;
}
