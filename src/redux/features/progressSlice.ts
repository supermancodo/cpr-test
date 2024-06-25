import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnsweredQuestion {
  questionId: number;
  score: number;
}

interface ProgressState {
  progress: number;
  score: number;
  answeredQuestions: AnsweredQuestion[];
}

const initialState: ProgressState = {
  progress: 0,
  score: 0,
  answeredQuestions: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setScore: (
      state,
      action: PayloadAction<{ questionId: number; score: number }>
    ) => {
      const { questionId, score } = action.payload;

      const existingAnswerIndex = state.answeredQuestions.findIndex(
        (aq) => aq.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        state.score +=
          score - state.answeredQuestions[existingAnswerIndex].score;
        state.answeredQuestions[existingAnswerIndex].score = score;
      } else {
        state.answeredQuestions.push({ questionId, score });
        state.score += score;
      }
    },
  },
});

export const { setProgress, setScore } = progressSlice.actions;

export default progressSlice.reducer;
