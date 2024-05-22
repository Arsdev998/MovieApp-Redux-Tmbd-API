import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScroll from "../components/HorizontalScroll";

const Home = () => {
  const trandingData = useSelector((state) => state.movioData.bannerData);
  return (
    <section className="">
      <BannerHome />
      <HorizontalScroll data={trandingData} heading={"Trend a Week"} />
    </section>
  );
};

export default Home;
