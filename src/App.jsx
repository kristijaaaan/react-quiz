import StartScreen from "./StartScreen";
import Quiz from "./Quiz";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const maxPoints = questions?.reduce(
    (acc, current) => acc + current.points,
    0
  );
  const { status } = useSelector((state) => state.quiz);

  useEffect(() => {
    fetch(`https://6528086c931d71583df1c56c.mockapi.io/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (status === "ready" || status === "finished")
    return <StartScreen maxPoints={maxPoints} />;

  if (status === "active")
    return <Quiz questions={questions} maxPoints={maxPoints} />;
}
