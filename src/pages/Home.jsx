import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Home = () => {
  const trandingData = useSelector((state) => state.movioData.bannerData);
  return (
    <section className="">
      <BannerHome />
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-lg lg:text-3xl font-bold mb-3">Trending Show</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {trandingData.map((data, index) => {
            return (
              <Card
                key={data.id}
                data={data}
                index={index + 1}
                trending={true}
              />
            );
          })}
        </div>
       
      </div>
    </section>
  );
};

export default Home;
