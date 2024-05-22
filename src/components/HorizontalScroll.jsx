import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScroll = ({ data = [], heading }) => {
  const containerRef = useRef();

  const handleNext = ()=>{
    containerRef.current.scrollLeft +=300
  }
  const handlePrev = ()=>{
    containerRef.current.scrollLeft -=300
  }
  return (
    <div>
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-lg lg:text-3xl font-bold mb-5">{heading}</h2>
        <div className=" relative">
          <div
            ref={containerRef}
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-flow-col gap-4  overflow-hidden  z-10 scroll-smooth transition-all"
          >
            {data.map((data, index) => {
              return (
                <Card
                  key={data.id + "heading" + index}
                  data={data}
                  index={index + 1}
                  trending={true}
                />
              );
            })}
          </div>
          <div className="absolute top-0 flex justify-between w-full h-full items-center">
            <button onClick={handlePrev} className="bg-primary -ml-4 rounded-full p-1  z-10 text-2xl hover:bg-gradient-to-r hover:from-red-800 hover:to-primary">
              <FaAngleLeft />
            </button>
            <button onClick={handleNext} className="bg-primary -mr-3 rounded-full p-1  z-10 text-2xl hover:bg-gradient-to-r hover:from-red-800 hover:to-primary">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
