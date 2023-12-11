import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async function () {
    const res = await fetch(
      `https://6528086c931d71583df1c56c.mockapi.io/questions`
    );

    return await res.json();
  }
);

const initialState = {
  questions: [],
  status: "ready",
  points: 0,
  question: 0,
  highscore: 0,
  answer: null,
  timeLeft: 120,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = "active";
      state.points = 0;
      state.timeLeft = 120;
    },
    answerQuestion: (state, action) => {
      state.answer = action.payload;
    },
    answerCorrect: (state, action) => {
      state.points = state.points + action.payload;
    },
    nextQuestion: (state) => {
      if (state.question !== state.questions.length - 1) {
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
    tick: (state, action) => {
      state.timeLeft = state.timeLeft - 1;
      state.timeLeft === 0 && quizSlice.caseReducers.finishGame(state, action);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    }),
});

export const {
  startGame,
  answerQuestion,
  answerCorrect,
  nextQuestion,
  finishGame,
  tick,
} = quizSlice.actions;

export default quizSlice.reducer;
