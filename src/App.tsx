import { useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import Question from './components/Question';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setProgress } from './redux/features/progressSlice';
import CircularProgress from './components/CircularProgress';

function App() {
  const { questions } = useAppSelector((state) => state.question);
  const { progress, score } = useAppSelector((state) => state.progress);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialProgress = (1 / questions.length) * 100;
    dispatch(setProgress(initialProgress));
  }, [dispatch, questions.length]);

  const handleProgressChange = (newProgress: number) => {
    dispatch(setProgress(newProgress));
  };

  return (
    <div className='container mx-auto p-10'>
      <div className='flex gap-4'>
        <div className='basis-1/2 flex flex-col gap-6'>
          <ProgressBar progress={progress} />
          <Question onProgressChange={handleProgressChange} />
        </div>
        <div className='basis-1/2 flex-1 flex-none'>
          <div className='flex justify-center items-center h-full'>
            <CircularProgress progress={score} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
