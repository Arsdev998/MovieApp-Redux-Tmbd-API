import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const [data,setData] = useState([])
  console.log("location", location);
  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h2 className="capitalize text-lg lg:text-xl font-extrabold my-3">Search Result</h2>
      </div>
    </div>
  );
};

export default SearchPage;
