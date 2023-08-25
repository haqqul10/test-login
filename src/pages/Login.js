import { useState } from "react";
import Logo from "../assets/Logo.png";
import IllustrasiLogin from "../assets/Illustrasi Login.png";
import { Link, useNavigate } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const { loading, error } = useSelector((state) => state.user);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredential = { email, password };
    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
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
          Masuk atau buat akun <br className="hidden lg:block" /> untuk memulai
        </h3>
        <div className="w-full lg:w-1/2 mt-6">
          <form action="" className="flex flex-col" onSubmit={handleLoginEvent}>
            {error && (
              <div className="text-xs text-red-500 rounded-sm p-3 mb-4 bg-red-100">
                {error}
              </div>
            )}
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
            <label htmlFor="password" className="relative">
              <BiLock className="absolute top-3 left-3 text-gray-300" />
              <input
                type={type}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="border py-3 px-9 text-xs border-gray-300 rounded-sm w-full"
              />
              <span
                className="absolute cursor-pointer top-3 right-3 text-gray-300"
                onClick={handleToggle}
              >
                {type === "password" ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </label>
            <button
              type="submit"
              className="bg-red-600 p-3 text-white mt-10 rounded-sm"
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-sm">
          belum punya akun? registrasi{" "}
          <Link to={`/registrasi`} className="text-red-600">
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

export default Login;
