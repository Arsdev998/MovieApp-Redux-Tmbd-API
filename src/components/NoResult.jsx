import React from "react";
import not from "../assets/notfound.png";
const NoResult = () => {
  return (
    <div className="flex flex-col justify-center min-h-[60vh] items-center font-bold font-mono text-primary ">
     <h1 className="text-6xl">404</h1>
      <p className="">No Data Results</p>
    </div>
  );
};

export default NoResult;
