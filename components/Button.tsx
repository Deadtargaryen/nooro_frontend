import React from "react";

interface ButtonProps {
  text: string; // Text displayed on the button
  onClick?: () => void; // Click event handler
  children?: React.ReactNode; // Child elements, which would be the icon in your case
  variant?: "primary" | "secondary" | "danger"; // Variants for styling
  isDisabled?: boolean; // Disable the button
  className?: string; // Additional Tailwind classes
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  isDisabled = false,
  className = "",
  children,
}) => {
  // Define base styles
  const baseStyles =
    "px-4 py-2 rounded font-semibold focus:outline-none focus:ring transition ease-in-out duration-150 flex items-center justify-center";

  // Define styles based on the variant
  const variantStyles = {
    primary: "bg-[#1E6F9F] text-white hover:bg-blue-600 focus:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text} {/* Text first */}
      {children && <span className="ml-2">{children}</span>} {/* Icon after the text */}
    </button>
  );
};

export default Button;
