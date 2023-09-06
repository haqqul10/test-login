import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl mb-4">
          Selamat Datang {data?.email}
        </h1>
        <p>
          Bismillah semoga diterima, biar tahun depan bisa nikah 😁 aminnn 🤲
        </p>
        <div
          className="cursor-pointer flex flex-row items-center gap-2 justify-center mt-9"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Home;
