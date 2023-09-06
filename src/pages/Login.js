import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    onSubmit: (values) => {
      const payload = JSON.stringify(values);
      localStorage.setItem("user", payload);

      setLoading(true);
      setTimeout(() => {
        navigate("/home");
        setLoading(false);
      }, 1500);
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email address").required(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex lg:grow-[3] xl:grow-[5] bg-[#7879F1] h-full items-center justify-center">
        <div className="bg-[#FFFFFF66] px-[88px] pt-[138px] pb-[104px] flex items-center">
          <div className="w-[360px]">
            <h1 className="font-semibold text-5xl text-white leading-[57.6px]">
              Lorem ipsum <br /> dolor si <br /> amet
            </h1>
            <h4 className="font-semibold text-5xl leading-[48px]">
              consectetur
            </h4>
            <p className="mt-10 font-normal text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div className="flex lg:grow-[2] xl:grow-[4] grow items-center justify-center">
        <div className="px-[24px] pt-[83px] lg:pt-0 lg:px-0 max-w-[360px] sm:max-w-[416px] lg:w-auto md:mx-auto">
          <div className="mb-12">
            <p className="text-[32px] font-bold leading-[48px]">Hello</p>
            <p className="text-lg font-normal leading-[27px]">
              Enter your email and password to login.
            </p>
          </div>
          <div>
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleForm}
                  placeholder="masukkan email anda"
                  className="border p-4 border-[#AFA2C3] text-xs rounded-lg my-2 w-full"
                />
                <p className="text-red-400 mb-6 text-xs">
                  {formik.errors.email}
                </p>
              </div>
              <div className="relative">
                <label htmlFor="password">Password</label>
                <input
                  type={type}
                  name="password"
                  onChange={handleForm}
                  placeholder="password"
                  className="border p-4 border-[#AFA2C3] text-xs rounded-lg my-2 w-full"
                />
                <span
                  className="absolute text-xl cursor-pointer top-12 right-5 text-[#493C5D] lg:text-[#B2A6C5]"
                  onClick={handleToggle}
                >
                  {type === "password" ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
                <p className="text-red-400 mb-6 text-xs">
                  {formik.errors.password}
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <label className="flex font-normal text-base" for="remember">
                    <input
                      className="leading-tight mr-2 accent-[#3E334E] lg:accent-[#7879F1]"
                      type="checkbox"
                      id="remember"
                      name="remember"
                      // onChange={() => setFieldValue("checked", !values.checked)}
                    />
                    <span className="text-base">Remember me</span>
                  </label>
                </div>
                <div>
                  <a
                    className="font-normal text-base underline hover:opacity-80"
                    href="#password-request"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <button
                  type="submit"
                  className="bg-[#7879F1] py-4 hover:opacity-80 text-white rounded-lg text-base font-semibold w-[178px] lg:w-[196px]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      loading...
                    </div>
                  ) : (
                    <div>Login</div>
                  )}
                </button>
                <Link
                  to=""
                  className="bg-transparent hover:bg-[#7879F1] hover:text-white hover:border-[#7879F1] py-4 flex justify-center border border-[#3E334E] rounded-lg text-base font-semibold w-[178px] lg:w-[196px]"
                >
                  Signup
                </Link>
              </div>
            </form>
            <div className="mt-12">
              <p className="font-normal text-sm leading-[14px] text-center">
                Or, login with
              </p>
              <div className="mt-4 flex justify-between gap-4">
                <Link className="border border-[#AFA2C3] hover:bg-[#AFA2C3] hover:text-white py-3 w-[116px] lg:w-[123px] rounded leading-[14px] flex items-center justify-center text-sm font-medium">
                  Facebook
                </Link>
                <Link className="border border-[#AFA2C3] hover:bg-[#AFA2C3] hover:text-white py-3 w-[116px] lg:w-[123px] rounded leading-[14px] flex items-center justify-center text-sm font-medium">
                  Linked In
                </Link>
                <Link className="border border-[#AFA2C3] hover:bg-[#AFA2C3] hover:text-white py-3 w-[116px] lg:w-[123px] rounded leading-[14px] flex items-center justify-center text-sm font-medium">
                  Google
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
