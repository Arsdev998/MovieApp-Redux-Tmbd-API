import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import NoResult from "../components/NoResult";

const ExplorePage = () => {
  const params = useParams();
  // console.log("params", params); // Debugging params untuk melihat apa yang diterima dari URL
  const [pageNo, setPageNo] = useState(1); // State untuk nomor halaman
  const [data, setData] = useState([]); // State untuk data yang diambil
  const [totalPageNo, setTotalPageNo] = useState(0); // State untuk total halaman
  const [isLoading, setIsLoading] = useState(false); // Ta

  // Fungsi untuk mengambil data dari API
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo, // Mengirim nomor halaman sebagai parameter
        },
      });
      // Menggabungkan data baru dengan data yang sudah ada
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      // Mengatur total halaman dari respons API
      setTotalPageNo(response.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error); // Menangani kesalahan jika ada
    }
  }, [pageNo, params.explore]); // Menambahkan dependensi pageNo dan params.explore

  // Fungsi untuk menangani scroll
  const handleScroll = useCallback(() => {
    // Memeriksa apakah pengguna telah mencapai bagian bawah halaman
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageNo < totalPageNo
    ) {
      setPageNo((prev) => prev + 1); // Meningkatkan nomor halaman jika belum mencapai total halaman
    }
  }, [pageNo, totalPageNo]); // Menambahkan dependensi pageNo dan totalPageNo

  // Mengambil data saat pageNo atau params.explore berubah
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependensi pada fetchData

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);
  // Menambahkan dan membersihkan event listener untuk scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Menambahkan event listener saat komponen mount
    return () => {
      window.removeEventListener("scroll", handleScroll); // Membersihkan event listener saat komponen unmount
    };
  }, [handleScroll]); // Dependensi pada handleScroll

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-2xl font-extrabold my-3">
          Popular {params.explore} show
        </h3>

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

export default ExplorePage;
