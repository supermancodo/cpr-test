import React from 'react';

export enum ButtonVariant {
  Contained = 'contained',
  Outlined = 'outlined',
}

interface ButtonProps {
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  disabled,
  onClick,
}) => {
  const baseStyles = 'py-2 px-6 rounded-3xl transition-colors duration-300';

  const containedStyles = 'bg-[#072855] text-white hover:bg-[#4B4FE2]';
  const outlinedStyles =
    'bg-white text-[#072855] border border-[#072855] hover:bg-[#072855] hover:text-white';

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const buttonStyles = `${baseStyles} ${
    variant === ButtonVariant.Contained ? containedStyles : outlinedStyles
  } ${disabled ? disabledStyles : ''}`;

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
