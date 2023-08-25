import { useState, useEffect } from "react";
import { hostName } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";

const Categori = () => {
  const [services, setServices] = useState([]);
  // get data services
  useEffect(() => {
    const fetchServices = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/services`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setServices(data);
      }
    };
    fetchServices();
  }, []);

  if (!services.data) {
    return (
      <div>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
          <div className="w-6 h-6 rounded-full border-3 border-red-600"></div>
        </svg>
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-16">
      <div className="grid grid-cols-4 gap-4 lg:flex lg:justify-between">
        {services.data.map((item, index) => (
          <div className="flex flex-col item-center w-[6rem]" key={index}>
            <Link to={`/${item.service_code}`}>
              <img className="w-20 mx-auto" src={item.service_icon} alt="" />
              <div className="mt-2 mx-auto text-center text-sm">
                {item.service_name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categori;
