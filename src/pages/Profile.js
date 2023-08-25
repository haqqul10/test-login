import React, { useState, useEffect, useRef } from "react";
import { hostName } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import profileDefault from "../assets/Profile Photo.png";
import { MdModeEditOutline, MdAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../store/UserSlice";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout);
    navigate("/login");
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    setImage(file);
  };

  // get data banner
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

  if (!profile.data) {
    return (
      <div>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header />
      <div className="container mx-auto mt-6">
        <div className="flex justify-center flex-col items-center">
          <div className="inline-block relative">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-36 h-36 rounded-full"
              />
            ) : (
              <img
                src={`${
                  profile.data.profile_image ===
                  "https://minio.nutech-integrasi.app/take-home-test/null"
                    ? profileDefault
                    : profile.data.profile_image
                }`}
                alt=""
                className="w-36 rounded-full"
              />
            )}
            <div
              onClick={handleImageClick}
              className="absolute border rounded-full p-1 border-gray-400 cursor-pointer bottom-0 right-3 bg-white"
            >
              <MdModeEditOutline />
              <input
                type="file"
                ref={inputRef}
                className="w-full h-full hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="font-medium mt-5 text-2xl">
            {profile.data.first_name}
          </div>
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
                value={profile.data.email}
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
                value={profile.data.first_name}
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
                value={profile.data.last_name}
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </div>
            <Link to="/editprofile">
              <button
                type="submit"
                className="bg-white border-2 w-full border-red-600 p-3 text-red-600 rounded-md mb-6 text-sm font-medium"
              >
                Edit Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              type="submit"
              className="bg-red-600 p-3 text-white rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
