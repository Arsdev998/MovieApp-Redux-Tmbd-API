import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/movioSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrending();
    fetchConfiguration();
  }, []);
  const fetchTrending = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error masbroo" + error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {}
  };

  return (
    <main className="pb-14  lg:p-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </main>
  );
}

export default App;
