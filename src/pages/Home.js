import React, { useState } from "react";
import Header from "../components/Header";
import HeroProfile from "../components/HeroProfile";
import Categori from "../components/Categori";
import Card from "../components/Card";

const Home = () => {
  const getUser = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  };

  const [user, setUser] = useState(getUser());
  // console.log(user);

  return (
    <div>
      <Header />
      <HeroProfile />
      <Categori />
      <Card />
    </div>
  );
};

export default Home;
