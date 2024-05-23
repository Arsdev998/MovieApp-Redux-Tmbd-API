import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScroll from "../components/HorizontalScroll";
import axios from "axios";
import  useFetch  from "../hooks/useFetch";

const Home = () => {
  const trandingData = useSelector((state) => state.movioData.bannerData);
  const { data: topRated } = useFetch("/movie/top_rated");
  const { data: upcommingdata } = useFetch("/movie/upcoming");
  const { data: popularData } = useFetch("/tv/popular");
  const { data: tvAiringTodayData } = useFetch("tv/airing_today");
  const { data: tvOnTheAir } = useFetch("tv/on_the_air");

  return (
    <section className="">
      <BannerHome />
      <HorizontalScroll
        data={trandingData}
        heading={"Trending"}
        trending={'movie'}
      />
      <HorizontalScroll
        data={topRated}
        heading={"Top Rated"}
        media_type={'movie'}
      />
      <HorizontalScroll
        data={upcommingdata}
        heading={"Upcomming"}
        media_type={'movie'}
      />
      <HorizontalScroll
        data={popularData}
        heading={"Popular Tv"}
        media_type={'tv'}
      />
      <HorizontalScroll
        data={tvAiringTodayData}
        heading={"Tv Airing Today"}
        media_type={'tv'}
      />'
      <HorizontalScroll
        data={tvOnTheAir}
        heading={"Tv On The Air"}
        media_type={'tv'}
      />
    </section>
  );
};

export default Home;
