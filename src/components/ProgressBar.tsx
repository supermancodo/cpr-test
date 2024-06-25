import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const barVariants = {
    initial: { width: '0%' },
    animate: { width: `${progress}%` },
  };

  return (
    <div className='relative pt-1'>
      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-200'>
        <motion.div
          className='flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#4B4FE2]'
          initial='initial'
          animate='animate'
          variants={barVariants}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
