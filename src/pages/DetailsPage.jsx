import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails"; // Perbaikan: Menggunakan useFetchDetails
import { useSelector } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScroll from "../components/HorizontalScroll";
import useFetch from "../hooks/useFetch";

const DetailsPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movioData.imageUrl);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );
  console.log("data", data);
  console.log("cast", castData);
  console.log("similar", similarData);

  const duration = (
    Number(data?.runtime || data?.episode_run_time?.length[0]) / 60
  )
    .toFixed(1)
    .split(".");

  const writer = castData?.crew
    ?.filter((el) => el?.department === "Writing")
    ?.map((el) => el?.name)
    ?.join(", ");

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
        <div className="-mt-52 lg:-mt-36 relative lg:ml-0 mx-auto lg:mx-0 w-fit min-w-60">
          <img
            src={imageUrl + data?.poster_path || imageUrl + data?.backdrop_path}
            className="h-80  w-60 object-cover rounded"
            alt=""
          />
        </div>
        <div className="">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-500 ">{data?.tagline}</p>
          <Divider />
          <div className="">
            <div className="flex items-center gap-x-4">
              <p className="flex items-center gap-x-[1px]">
                <MdOutlineStar className="text-yellow-500  text-lg mt-[0.5px]" />
                {Number(data?.vote_average).toFixed(1)}
              </p>
              <span>|</span>
              <p className="flex items-center gap-x-1">
                <FaEye className="text-yellow-500 text-lg mt-[2px]" />{" "}
                {data?.popularity}
              </p>
              <span>|</span>
              <p className="flex items-center gap-x-[1px]">
                <MdOutlineAccessTime className="text-yellow-500 text-lg mt-[2px]" />
                {duration[0]}h {duration[1]}m
              </p>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-center gap-x-4"></div>
          </div>
          <div className="">
            <h3 className="text-xl font-bold text-white mb-2">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex gap-x-3 my-3">
              <p className="flex items-center gap-x-[1px]">
                Status : {data?.status}
              </p>
              <span>|</span>
              <p className="flex items-center gap-x-[4px]">
                Seasons : {""}
                {data?.seasons?.length || "-"}
              </p>
              <span>|</span>
              <p className="flex items-center gap-x-1">
                Relase :{" "}
                {moment(data?.release_date || data?.first_air_date).format(
                  "LL"
                )}
              </p>
            </div>
            <Divider />
          </div>
          <div className="">
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData?.crew[0]?.name || "Api data not found"}
            </p>
            <Divider />
            <p>
              <span className="text-white">
                Writer : {writer || "Api data not found"}
              </span>
            </p>
          </div>
          <Divider />
          <h2 className="font-bold text-lg my-2">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-6">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((cast, index) => {
                return (
                  <div className="" key={index}>
                    <div className="">
                      <img
                        src={imageUrl + cast?.profile_path}
                        alt=""
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {cast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="">
        <HorizontalScroll
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScroll
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
