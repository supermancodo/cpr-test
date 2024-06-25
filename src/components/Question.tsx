import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button, { ButtonVariant } from './common/Button';
import OptionCard from './OptionCard';
import { setScore } from '../redux/features/progressSlice';
import { selectOption } from '../redux/features/questionSlice';

interface QuestionProps {
  onProgressChange: (progress: number) => void;
}

const Question: React.FC<QuestionProps> = ({ onProgressChange }) => {
  const { questions } = useAppSelector((state) => state.question);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useAppDispatch();
  const controls = useAnimation();

  const selectedOptionIndex = useAppSelector(
    (state) => state.question.selectedOptions[currentQuestionIndex]
  );

  const isOptionSelected =
    selectedOptionIndex !== undefined && selectedOptionIndex !== null;

  const updateProgress = (index: number) => {
    const progress = ((index + 1) / questions.length) * 100;
    onProgressChange(progress);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      await controls.start({ opacity: 0, y: 50 });
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      updateProgress(newIndex);
      controls.start({ opacity: 1, y: 0 });
    }
  };

  const handleBack = async () => {
    if (currentQuestionIndex > 0) {
      await controls.start({ opacity: 0, y: -50 });
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      updateProgress(newIndex);
      controls.start({ opacity: 1, y: 0 });
    }
  };

  const handleOptionClick = (
    optionIndex: number,
    score: number,
    questionId: number
  ) => {
    dispatch(selectOption({ questionId, optionIndex }));
    dispatch(setScore({ questionId, score }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      key={currentQuestion.id}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
    >
      <h2 className='text-4xl mb-4'>{currentQuestion.question}</h2>
      <div className='flex flex-wrap mt-4'>
        {currentQuestion.options.map((option, index) => (
          <OptionCard
            key={index}
            option={option.text}
            onClick={() =>
              handleOptionClick(index, option.score, currentQuestion.id)
            }
            isSelected={index === selectedOptionIndex}
          />
        ))}
      </div>
      <div className='flex justify-between mt-4'>
        <AnimatePresence>
          <motion.div
            key='back-button'
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 1,
            }}
          >
            <Button
              text='Back'
              onClick={handleBack}
              variant={ButtonVariant.Outlined}
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key='next-button'
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 1,
            }}
          >
            <Button
              text='Next'
              onClick={handleNext}
              variant={ButtonVariant.Contained}
              disabled={!isOptionSelected}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Question;
