import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { hostName } from "../config";
import axios from "axios";
import profileDefault from "../assets/Profile Photo.png";

const HeroProfile = () => {
  const [profile, setProfile] = useState([]);
  const [saldo, setSaldo] = useState([]);

  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  // get data profile
  useEffect(() => {
    const fetchProfile = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/profile`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  // get data saldo
  useEffect(() => {
    const fetchSaldo = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/balance`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setSaldo(data);
      }
    };
    fetchSaldo();
  }, []);

  if (!profile.data || !saldo.data) {
    return (
      <div>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  // console.log(profile.data);

  return (
    <section className="container mx-auto mt-8">
      <div className="flex lg:flex-row flex-col justify-between">
        <div className="flex flex-1 flex-col mb-6 lg:mb-0">
          <div className="mb-6">
            <img
              src={`${
                profile.data.profile_image ===
                "https://minio.nutech-integrasi.app/take-home-test/null"
                  ? profileDefault
                  : profile.data.profile_image
              }`}
              alt=""
              className="rounded-full"
            />
          </div>
          <div>
            <p>Selamat datang,</p>
            <p className="font-medium text-4xl">
              {profile.data.first_name} {profile.data.last_name}
            </p>
          </div>
        </div>
        <div className="flex flex-1 lg:relative right-0 rounded-md overflow-hidden">
          <div className="bg-hero bg-right bg-no-repeat w-full h-full lg:absolute py-8 px-9 lg:px-[85px]">
            <div className="text-white">
              <p className="mb-2">Saldo anda</p>
              <h3 className="font-medium text-2xl mb-2 ">
                Rp{" "}
                <input
                  className="bg-transparent border-none outline-none"
                  readOnly
                  type={type}
                  value={saldo.data.balance}
                />
                {}
              </h3>
              <p className="flex items-center gap-2 text-sm">
                lihat saldo{" "}
                <span className="cursor-pointer" onClick={handleToggle}>
                  {type === "password" ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfile;
