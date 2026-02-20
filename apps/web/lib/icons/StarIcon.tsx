import React from "react";

interface SparkleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const SparkleIcon: React.FC<SparkleIconProps> = ({
  size = 21,
  color = "#FFCD6C",
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8.36124 1.30595C9.00555 -0.43529 11.4683 -0.435287 12.1126 1.30595L13.6991 5.59319C13.9016 6.14062 14.3333 6.57224 14.8807 6.77481L19.1679 8.36124C20.9092 9.00555 20.9092 11.4683 19.1679 12.1126L14.8807 13.6991C14.3333 13.9016 13.9016 14.3333 13.6991 14.8807L12.1126 19.1679C11.4683 20.9092 9.00555 20.9092 8.36124 19.1679L6.77481 14.8807C6.57224 14.3333 6.14062 13.9016 5.59318 13.6991L1.30595 12.1126C-0.43529 11.4683 -0.435287 9.00555 1.30595 8.36124L5.59319 6.77481C6.14062 6.57224 6.57224 6.14062 6.77481 5.59318L8.36124 1.30595Z"
        fill={color}
      />
    </svg>
  );
};
