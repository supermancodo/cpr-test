import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Option {
  id: number;
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: number;
}

interface QuestionState {
  selectedOptions: Record<number, number | null>;
  questions: Question[];
}

const initialState: QuestionState = {
  selectedOptions: {},
  questions: [
    {
      id: 0,
      question: 'What is the capital of France?',
      options: [
        { id: 0, text: 'London', score: 10 },
        { id: 1, text: 'Paris', score: 50 },
        { id: 2, text: 'Berlin', score: 5 },
        { id: 3, text: 'Madrid', score: 7 },
      ],
      correctAnswer: 1,
    },
    {
      id: 1,
      question: 'Who wrote "Hamlet"?',
      options: [
        { id: 0, text: 'William Shakespeare', score: 10 },
        { id: 1, text: 'Charles Dickens', score: 5 },
        { id: 2, text: 'Jane Austen', score: 3 },
        { id: 3, text: 'Leo Tolstoy', score: 7 },
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question:
        'What is the capital of France? What is the capital of France? What is the capital of France?',
      options: [
        { id: 0, text: 'London', score: 10 },
        { id: 1, text: 'Paris', score: 20 },
        { id: 2, text: 'Berlin', score: 12 },
        { id: 3, text: 'Madrid', score: 5 },
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: 'Who wrote "Hamlet"?',
      options: [
        { id: 0, text: 'William Shakespeare', score: 20 },
        { id: 1, text: 'Charles Dickens', score: 15 },
        { id: 2, text: 'Jane Austen', score: 19 },
        { id: 3, text: 'Leo Tolstoy', score: 16 },
      ],
      correctAnswer: 0,
    },
  ],
};

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: initialState.questions,
    selectedOptions: {},
  } as QuestionState,
  reducers: {
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const { id } = action.payload;
      const index = state.questions.findIndex((q) => q.id === id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    selectOption: (
      state,
      action: PayloadAction<{ questionId: number; optionIndex: number }>
    ) => {
      const { questionId, optionIndex } = action.payload;
      state.selectedOptions[questionId] = optionIndex;
    },
  },
});

export const { updateQuestion, selectOption } = questionSlice.actions;

export default questionSlice.reducer;
