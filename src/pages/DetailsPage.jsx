import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails"; // Perbaikan: Menggunakan useFetchDetails
import { useSelector } from "react-redux";

const DetailsPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movioData.imageUrl);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `${params?.explore}/${params?.id}/credits`
  );
  console.log("data", data);
  console.log("cast", castData);

  return (
    <div>
      <div className="w-full h-[350px] relative ">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path || imageUrl + data?.poster_path}
            className="h-full  w-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="-mt-52 lg:-mt-36 relative lg:ml-0 mx-auto lg:mx-0 w-fit">
          <img
            src={imageUrl + data?.poster_path || imageUrl + data?.backdrop_path }
            className="h-80  w-60 object-cover rounded"
            alt=""
          />
        </div>
        <div className="">
          <h2 className="text-2xl lg:text-2xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-500 ">{data?.tagline}</p>
          <div className="">
            <div className="">
              <p>{data?.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
