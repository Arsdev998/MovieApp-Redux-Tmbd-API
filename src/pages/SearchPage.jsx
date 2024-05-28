import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import NoResult from "../components/NoResult";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading
  const query = location?.search?.slice(3);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true); // Set isLoading ke true sebelum mengambil data
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page, // Mengirim nomor halaman sebagai parameter
        },
      });
      // Menggabungkan data baru dengan data yang sudah ada
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setIsLoading(false); // Set isLoading ke false setelah data diambil
    } catch (error) {
      console.log(error); // Menangani kesalahan jika ada
      setIsLoading(false); // Set isLoading ke false jika terjadi kesalahan
    }
  }, [location?.search]); // Menambahkan dependensi location?.search

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((preve) => preve + 1);
    }
  }; // Menambahkan dependensi pageNo dan totalPageN

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Menambahkan event listener saat komponen mount
    return () => {
      window.removeEventListener("scroll", handleScroll); // Membersihkan event listener saat komponen unmount
    };
  }, [handleScroll]); 

  useEffect(() => {
    fetchData();
  }, [page]);
  console.log(data);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 px-1  sticky top-16 z-40">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-2 text-black text-lg w-full bg-white rounded-full outline-primary"
          value={query?.split("20%")?.join(encodeURIComponent(" "))}

        />
      </div>
      <div className="container mx-auto">
        <h2 className="capitalize text-lg lg:text-xl font-extrabold my-3">
          Search Result
        </h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : data.length === 0 ? ( // Tampilkan NoResults saat data kosong
          <NoResult />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-7 justify-center md:justify-start">
            {data.map((searchData, index) => {
              return (
                <Card
                  data={searchData}
                  key={index}
                  media_type={searchData.media_type}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
