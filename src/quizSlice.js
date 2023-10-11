import { createSlice } from "@reduxjs/toolkit";
import { questions } from "./questions";

const initialState = {
  status: "ready",
  points: 0,
  question: 0,
  highscore: 0,
  answer: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = "active";
      state.points = 0;
    },
    answerQuestion: (state, action) => {
      state.answer = action.payload;
    },
    answerCorrect: (state, action) => {
      state.points = state.points + action.payload;
    },
    nextQuestion: (state) => {
      if (state.question !== questions.length - 1) {
        state.question = state.question + 1;
        state.answer = null;
      }
    },
    finishGame: (state) => {
      state.status = "finished";
      state.highscore =
        state.highscore < state.points ? state.points : state.highscore;
      state.question = 0;
      state.answer = null;
    },
  },
});

export const {
  startGame,
  answerQuestion,
  answerCorrect,
  nextQuestion,
  finishGame,
} = quizSlice.actions;

export default quizSlice.reducer;
