import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movioData.bannerData);
  const imageUrl = useSelector((state) => state.movioData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerData, imageUrl,currentImage]);
  console.log(bannerData);
  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={index}
            className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
            style={{ transform: `translateX(${-currentImage * 100}%)` }}
          >
            <div className="w-full h-full">
              <img
                src={imageUrl + data.backdrop_path}
                alt=""
                className="h-full object-cover w-full"
              />
            </div>
            {/* button nect and prev next images banner */}
            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
              <button
                onClick={handlePrev}
                className="bg-primary rounded-full p-1  z-10 text-2xl"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-primary rounded-full p-1  z-10 text-2xl"
              >
                <FaAngleRight />
              </button>
            </div>

            <div className="container mx-auto">
              <div className="absolute top-0  w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto absolute bottom-0 max-w-md px-3">
                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl ">
                  {data.title || data.name}
                </h2>
                <p className="text-clip line-clamp-3 my-2">{data.overview}</p>
                <div className="flex items-center gap-x-4">
                  <p className="flex items-center gap-x-1">
                    <MdOutlineStar className="text-yellow-500" />
                    {Number(data.vote_average).toFixed(1)}
                    <FaPlus className="text-xs  mt-[2px] lg:mt-[3px]" />
                  </p>
                  <span>|</span>
                  <p className="flex items-center gap-x-1">
                    <FaEye className="text-yellow-500" /> {data.popularity}
                    <FaPlus className="text-xs mt-[2px] lg:mt-[3px]" />
                  </p>
                </div>
                <button className="bg-gradient-to-r from-primary to-red-800 hover:bg-gradient-to-r hover:from-red-800 hover:to-primary px-4 py-2 text-black font-bold rounded-lg shadow-lg transition-transform transform-gpu my-4 hover:text-white hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
