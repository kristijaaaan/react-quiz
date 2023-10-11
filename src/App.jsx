import StartScreen from "./StartScreen";
import Quiz from "./Quiz";

import { useSelector } from "react-redux";

export default function App() {
  const { status } = useSelector((state) => state.quiz);

  if (status === "ready" || status === "finished") return <StartScreen />;

  if (status === "active") return <Quiz />;
}
