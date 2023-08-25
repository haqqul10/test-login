import React, { useState } from "react";
import Header from "../components/Header";
import HeroProfile from "../components/HeroProfile";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const TopUp = () => {
  const [pulsa, setPulsa] = useState("");

  return (
    <div>
      <Header />
      <HeroProfile />
      <div className="container mx-auto mt-8">
        <p>Silahkan masukkan</p>
        <p className="font-semibold text-2xl">Nominal Top Up</p>
        <div className="flex flex-col lg:flex-row gap-6 mt-10">
          <div className="w-full lg:w-[60%]">
            <form action="" className="w-full flex flex-col">
              <label htmlFor="topup" className="relative">
                <FaRegMoneyBillAlt className="absolute top-3 left-3 text-gray-300" />
                <input
                  type="text"
                  name="topup"
                  className="w-full border border-gray-300 rounded-sm py-3 px-9 text-xs"
                  placeholder="masukkan nominal Top Up"
                  onChange={(e) => setPulsa(e.target.value)}
                />
              </label>
              <button
                className={`${
                  pulsa === "" ? "bg-gray-300 focus:outline-none" : "bg-red-600"
                } p-3 rounded-md text-white mt-6`}
                disabled={pulsa === "" ? true : false}
              >
                Top Up
              </button>
            </form>
          </div>
          <div className="w-full lg:w-[40%] pb-8 lg:pb-0">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 10.000
              </div>
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 20.000
              </div>
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 30.000
              </div>
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 40.000
              </div>
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 50.000
              </div>
              <div className="border bg-transparent p-3 rounded-sm">
                Rp. 100.000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
