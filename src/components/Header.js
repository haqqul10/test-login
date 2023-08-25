import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className="border-b py-4">
      <div className="flex container mx-auto items-center justify-between">
        <Link to="/">
          <div className="flex gap-2 items-center font-medium">
            <img src={Logo} alt="" />
            SIMS PBOB
          </div>
        </Link>
        <div className="flex gap-4 lg:gap-16">
          <Link to="/pulsa">Top Up</Link>
          <Link to="/transaction">Transaction</Link>
          <Link to="/profile">Akun</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
