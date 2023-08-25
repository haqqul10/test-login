import { useState } from "react";
import Logo from "../assets/Logo.png";
import IllustrasiLogin from "../assets/Illustrasi Login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { signUpUser } from "../store/UserSlice";

const Registrasi = () => {
  const [typePassword, setTypePassword] = useState("password");
  const [typeNewPassword, setTypeNewPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const showPassword = () => {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };
  const showNewPassword = () => {
    if (typeNewPassword === "password") {
      setTypeNewPassword("text");
    } else {
      setTypeNewPassword("password");
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandle = (e) => {
    e.preventDefault();
    let userCredential = {
      email,
      first_name: namaDepan,
      last_name: namaBelakang,
      password,
      // newPassword,
    };
    console.log(userCredential);
    dispatch(signUpUser(userCredential)).then((result) => {
      if (result.payload) {
        setEmail("");
        setNamaDepan("");
        setNamaBelakang("");
        setPassword("");
        navigate("/login");
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-full px-4 lg:px-0 lg:w-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-6">
          <img src={Logo} alt="" />
          <div className="font-medium">SIMS PPOB</div>
        </div>
        <h3 className="font-medium text-center text-xl">
          Lengkapi data untuk <br className="hidden lg:block" /> untuk membuat
          akun
        </h3>
        <div className="w-full lg:w-1/2 mt-6">
          <form action="" className="flex flex-col">
            <label htmlFor="email" className="relative">
              <MdAlternateEmail className="absolute top-3 left-3 text-gray-300" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan email anda"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </label>
            <label htmlFor="nama_depan" className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-300 text-xs" />
              <input
                type="text"
                name="nama_depan"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
                placeholder="nama depan"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </label>
            <label htmlFor="nama_belakang" className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-300 text-xs" />
              <input
                type="text"
                name="nama_belakang"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
                placeholder="nama belakang"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
            </label>
            <label htmlFor="password" className="relative">
              <BiLock className="absolute top-3 left-3 text-gray-300" />
              <input
                type={typePassword}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm mb-6 w-full"
              />
              <span
                className="absolute cursor-pointer top-3 right-3 text-gray-300"
                onClick={showPassword}
              >
                {typePassword === "password" ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </label>
            <label htmlFor="buat_password" className="relative">
              <BiLock className="absolute top-3 left-3 text-gray-300" />
              <input
                type={typeNewPassword}
                name="buat_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="buat password"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm w-full"
              />
              <span
                className="absolute cursor-pointer top-3 right-3 text-gray-300"
                onClick={showNewPassword}
              >
                {typeNewPassword === "password" ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </label>
            <button
              type="submit"
              className="bg-red-600 p-3 text-white mt-10 rounded-sm"
              onClick={registerHandle}
            >
              Registrasi
            </button>
          </form>
        </div>
        <p className="mt-6 text-sm">
          sudah punya akun? login{" "}
          <Link to={`/login`} className="text-red-600">
            di sini
          </Link>
        </p>
      </div>
      <div className="w-1/2 hidden lg:block">
        <img src={IllustrasiLogin} alt="" className="object-cover w-full" />
      </div>
    </div>
  );
};

export default Registrasi;
