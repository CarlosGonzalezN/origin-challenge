import React, { useState, FormEvent, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Graphic from "../Graphic";
import { getDataTime } from "../../hooks/useDataTime";

interface StockData {
  symbol: string;
}

const ViewStock: React.FC = () => {
  const location = useLocation();
  const stockData = location.state?.stockData as StockData;
  const [dataTimeStock, setDataTimeStock] = useState<any>();
  const [realTime, setRealTime] = useState(false);
  const [historical, setHistorical] = useState(false);
  const [startDate, setStartDate] = useState("2023-06-16");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().slice(0, -14)
  );
  const [selectedInterval, setSelectedInterval] = useState("1min");
  const userName = localStorage.getItem("user");

  const loadDataTime = async () => {
    const data = {
      symbol: stockData.symbol,
      interval: selectedInterval,
      startDate: `${startDate}%2009:48:00`,
      endDate: `${endDate}%2009:48:00`,
      realTime: realTime,
    };
    const dataTime = await getDataTime(data);
    setDataTimeStock(dataTime);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadDataTime();
  };

  return (
    <div>
      <Navbar logo={stockData.symbol} userName={userName} />
      <form
        className="flex justify-center items-center mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <input
              type="radio"
              id="radio1"
              name="radioGroup"
              className="mr-2"
              checked={realTime}
              onChange={() => {
                setRealTime(true);
                setHistorical(false);
              }}
            />
            <label htmlFor="radio1">Tiempo real</label>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            <div className="flex items-center">
              <input
                type="radio"
                id="radio2"
                name="radioGroup"
                className="mr-2"
                checked={historical}
                onChange={() => {
                  setRealTime(false);
                  setHistorical(true);
                }}
              />
              <label htmlFor="radio2">Historico</label>
            </div>
            {historical ? (
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 sm:space-y-2">
                <div className="flex items-center">
                  <label htmlFor="select1" className="mr-2"></label>
                  <input
                    type="date"
                    id="startDate"
                    className="border border-gray-300 rounded p-2"
                    value={startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setStartDate(e.target.value)
                    }
                  />

                  <input
                    type="date"
                    id="endDate"
                    className="border border-gray-300 rounded p-2"
                    value={endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEndDate(e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
              <label>Intervalo</label>
              <select
                id="selectInterval"
                className="border border-gray-300 rounded p-2"
                value={selectedInterval}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedInterval(e.target.value)
                }
              >
                <option value="1min">1min</option>
                <option value="5min">5min</option>
                <option value="15min">15min</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Graficar
          </button>
        </div>
      </form>
      {dataTimeStock ? (
        <Graphic data={dataTimeStock} logo={stockData.symbol} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewStock;
