import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { MdOutlineStar } from "react-icons/md";

const Card = ({ data, trending, index }) => {
  const imageUrl = useSelector((state) => state.movioData.imageUrl);
  return (
    <div className="w-full max-w-[250px]  h-80 overflow-hidden rounded relative">
      <img src={imageUrl + data.poster_path} alt="" />
      <div className="absolute top-0">
        {trending && (
          <div className="py-1 px-4 bg-gradient-to-r from-red-800 text-white font-bold rounded-r-full overflow-hidden to-primary">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-gradient-to-r from-red-800/50 to-primary/50 p-[6px]">
        <h2 className="text-clip line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm flex items-center justify-between">
          <p className="text-neutral-400">
            {moment(data.release_date || data.first_air_date).format("LL")}
          </p>
          <p className="flex items-center text-sm">
            <MdOutlineStar className="text-yellow-500 text-[18px] mt-[1px]" />
            {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
