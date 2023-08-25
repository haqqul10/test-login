import { useState, useEffect } from "react";
import { hostName } from "../config";
import axios from "axios";
import Header from "../components/Header";
import HeroProfile from "../components/HeroProfile";

const Transaction = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  // get data banner
  useEffect(() => {
    const fetchTransaksi = async () => {
      const itemUser = JSON.parse(localStorage.getItem("user"));
      const token = itemUser.data.token;
      if (token) {
        const response = await axios.get(`${hostName}/transaction/history`, {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        });
        const data = await response.data;
        setTransaksi(data);
      }
    };
    fetchTransaksi();
  }, []);

  const handleShowMore = async () => {
    let newOffset = offset + 5;
    const itemUser = JSON.parse(localStorage.getItem("user"));
    const token = itemUser.data.token;
    if (token) {
      const response = await axios.get(`${hostName}/transaction/history`, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      });
      const data = await response.data;
      setTransaksi(data);
    }
    transaksi.push(...newOffset);
  };

  if (!transaksi.data) {
    return (
      <div>
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  console.log(transaksi.data.offset);

  return (
    <div>
      <Header />
      <HeroProfile />
      <div className="container mx-auto">
        <div className="mb-4 mt-8">
          <p className="font-medium">Semua transaksi</p>
        </div>
        <div className="flex flex-col gap-6">
          {transaksi.data.records &&
            transaksi.data.records.map((item, index) => (
              <div
                key={index}
                className="border rounded-sm border-gray-200 py-3 px-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`${
                        item.transaction_type === "TOPUP"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-medium`}
                    >
                      {item.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                      {item.total_amount}
                    </p>
                    <p className="text-gray-300 text-xs mt-1">
                      {item.created_on}
                    </p>
                  </div>
                  <div className="text-sm lowercase">
                    {item.transaction_type}
                  </div>
                </div>
              </div>
            ))}
          {transaksi.data.records.length === 0 && (
            <div className="flex items-center justify-center border rounded-md py-12 text-gray-400">
              belum ada transaksi
            </div>
          )}
          {transaksi.data.records.length > 0 && (
            <p
              onClick={handleShowMore}
              className="font-medium text-center mt-4 text-red-600 cursor-pointer pb-8 lg:pb-0"
            >
              show more
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
