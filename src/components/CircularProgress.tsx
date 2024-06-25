import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress }) => {
  const circumference = 2 * Math.PI * 16;
  const dashOffset = circumference * (1 - progress / 100);

  const circleVariants = {
    initial: {
      strokeDashoffset: circumference,
    },
    animate: {
      strokeDashoffset: dashOffset,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className='relative w-40 h-40'>
      <svg
        className='w-full h-full'
        width='46'
        height='46'
        viewBox='0 0 36 36'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          className='stroke-current text-gray-200'
          strokeWidth='2'
        ></circle>
        <motion.g
          className='origin-center -rotate-90 transform'
          initial='initial'
          animate='animate'
          variants={circleVariants}
        >
          <circle
            cx='18'
            cy='18'
            r='16'
            fill='none'
            className='stroke-current text-[#4B4FE2]'
            strokeWidth='2'
            strokeDasharray={circumference}
          ></circle>
        </motion.g>
      </svg>
      <div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
        <motion.span
          className='text-center text-2xl font-bold text-[#4B4FE2]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};

export default CircularProgress;
