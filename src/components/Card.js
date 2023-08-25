import { useState, useEffect } from "react";
import { hostName } from "../config";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Card = () => {
  const [banner, setBanner] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  // get data banner
  useEffect(() => {
    const fetchBanner = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/banner`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setBanner(data);
      }
    };
    fetchBanner();
  }, []);

  if (!banner.data) {
    return (
      <div>
        <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-16">
      <div>
        <div className="font-semibold mb-4">Temukan promo menarik</div>
        <Carousel responsive={responsive} arrows={false}>
          {banner.data.map((item) => (
            <div key={item.banner_name}>
              <img
                src={item.banner_image}
                alt=""
                className="w-full lg:w-auto"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Card;
