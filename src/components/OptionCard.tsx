import React from 'react';

interface OptionCardProps {
  option: string;
  onClick: () => void;
  isSelected: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  option,
  onClick,
  isSelected,
}) => {
  const borderColor = isSelected ? 'border-[#4B4FE2]' : 'border-gray-200';
  const hoverClass = isSelected ? '' : 'hover:border-gray-400';

  return (
    <div className='w-full sm:w-1/2 p-2'>
      <div
        className={`border ${borderColor} ${hoverClass} rounded-lg p-4 cursor-pointer flex items-center justify-start h-full`}
        onClick={onClick}
      >
        {option}
      </div>
    </div>
  );
};

export default OptionCard;
