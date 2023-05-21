import { ReactChild } from "react";

type PropsType = {
  className?: string;
  duplicationCount?: number;
  children?: ReactChild;
  ballColor?: string;
  length?: string;
  marginLeft?: string;
  bonus?:any
};

const Ball = ({
  className,
  duplicationCount,
  children,
  length,
  ballColor,
  bonus,
  marginLeft,
}: PropsType) => {
  return (
    <div className="flex justify-center">
      {Array.apply(null, {
        length: duplicationCount || duplicationCount > 0 ? duplicationCount : 1,
      }).map((_: any, k: number) => (
        <div
          key={k}
          className={`${ballColor ? ballColor : bonus? "bg-red-700" : "bg-yellow-500"} ${
            length ? length : "w-6 h-6"
          } ${marginLeft ? marginLeft : "ml-2"} ${
            className ? className : ""
          } rounded-full flex justify-center items-center text-white shadow-xl `}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Ball;
