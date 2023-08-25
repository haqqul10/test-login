import React from "react";
import Header from "../components/Header";
import ProfilePhoto from "../assets/Profile Photo.png";
import { MdModeEditOutline, MdAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const EditProfile = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="container mx-auto mt-6">
        <div className="flex justify-center flex-col items-center">
          <div className="inline-block relative">
            <img src={ProfilePhoto} alt="" className="w-36" />
            <div className="absolute border rounded-full p-1 border-gray-400 cursor-pointer bottom-0 right-3 bg-white">
              <MdModeEditOutline />
            </div>
          </div>
          <div className="font-medium mt-5 text-2xl">Sandiaga Uno</div>
        </div>
        <div className="lg:w-1/2 lg:mx-auto mt-8">
          <form action="" className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm">
              Email
            </label>
            <div className="relative">
              <MdAlternateEmail className="absolute top-3 left-3" />
              <input
                type="email"
                name="email"
                // value="veolet@gmail.com"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </div>
            <label htmlFor="nama_depan" className="mb-2 text-sm">
              Nama Depan
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-xs" />
              <input
                type="text"
                name="nama_depan"
                // value="sandiaga"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </div>
            <label htmlFor="nama_belakang" className="mb-2 text-sm">
              Nama Belakang
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-xs" />
              <input
                type="text"
                name="nama_belakang"
                // value="uno"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 p-3 text-white rounded-md text-sm font-medium"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
