import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroProfile from "../components/HeroProfile";
import Listrik from "../assets/Listrik.png";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { hostName } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListrikPrabayar = () => {
  const [services, setServices] = useState([]);
  const [topup, setTopup] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // get data services
  useEffect(() => {
    const fetchServices = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/services`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setServices(data);

        let url = window.location.pathname;
        let cutUrl = url.substring(1);
        // console.log(cutUrl, data.data);

        const filter = data.data.find((item) => {
          return item.service_code === cutUrl;
        });

        setTopup(filter.service_tariff);
      }
    };
    fetchServices();
  }, []);

  if (!services.data) {
    return (
      <div>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
          <div className="w-6 h-6 rounded-full border-3 border-red-600"></div>
        </svg>
      </div>
    );
  }
  // console.log(filter.service_tariff);

  const handleTopup = async (e) => {
    e.preventDefault();
    const itemUser = JSON.parse(localStorage.getItem("user"));
    const token = itemUser.data.token;
    if (token) {
      try {
        const response = await axios.post(
          `${hostName}/transaction`,
          { service_code: "PULSA" },
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        const data = await response.data;
        setServices(data);
        navigate("/transaction");
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        // setError("");
      }
    }
  };

  const handleChangeTopup = (event) => {
    const inputTopup = event.target.value;
    setTopup(inputTopup);
  };

  // console.log(services);

  return (
    <div>
      <Header />
      <HeroProfile />
      <div className="container mx-auto">
        <div className="mt-8">
          <p>Pembayaran</p>
          <div className="flex items-center gap-2 mt-2">
            <img src={Listrik} alt="" className="w-7" />
            <p className="font-medium text-lg">Listrik Prabayar</p>
          </div>
        </div>
        <div className="mt-10">
          <form action="" className="w-full flex flex-col">
            <label htmlFor="topup" className="relative">
              <FaRegMoneyBillAlt className="absolute top-3 left-3" />
              <input
                type="text"
                name="topup"
                className="w-full border border-gray-300 rounded-sm py-3 px-9 text-xs"
                placeholder="masukkan nominal Top Up"
                value={topup}
                onChange={handleChangeTopup}
              />
            </label>
            <button
              onClick={handleTopup}
              className="bg-red-600 p-3 rounded-md text-white mt-6"
            >
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListrikPrabayar;
