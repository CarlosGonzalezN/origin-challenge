import React, { useEffect, useState } from "react";
import { getStocks } from "../../hooks/useStocks";
import { useGlobalState } from "../../hooks/useContextState";

interface StockItem {
  symbol: string;
}

const InputButtonComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<StockItem[]>([]);
  const [load, setLoad] = useState(true);
  const [filteredData, setFilteredData] = useState<StockItem[]>([]);
  const { addStocks }: any = useGlobalState();

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    const selectedItem = filteredData.find(
      (item) => item.symbol === inputValue
    );
    if (selectedItem) {
      addStocks(selectedItem);
    }
  };

  async function loadData() {
    const dataStocks = await getStocks();
    if (dataStocks) {
      setData(dataStocks);
      setLoad(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.symbol.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [inputValue, data]);

  return (
    <div className="flex items-center">
      {!load ? (
        <select
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 rounded-lg mr-2"
        >
          <option value="">Todos</option>
          {filteredData.map((item) => (
            <option key={item.symbol} value={item.symbol}>
              {item.symbol}
            </option>
          ))}
        </select>
      ) : (
        <p>no hay datos</p>
      )}
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Enviar
      </button>
    </div>
  );
};

export default InputButtonComponent;
