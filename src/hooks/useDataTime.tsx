import axios from "axios";

const getDataTime = async (data: {
  symbol: string;
  interval: string;
  startDate?: string;
  endDate?: string;
  realTime?: boolean;
}) => {
  const symbol = data.symbol.toUpperCase() || "A";
  const interval = data.interval || "5min";
  const startDate = data.startDate;
  const endDate = data.endDate;

  try {
    let response;

    if (data.realTime) {
      response = await axios.get(
        `http://localhost:3001/stocks/${symbol}/${interval}`
      );
    } else {
      response = await axios.get(
        `http://localhost:3001/stocks/${symbol}/${interval}/${startDate}/${endDate}`
      );
    }

    return response.data.values;
  } catch (error) {
    console.log(error);
  }
};

export default getDataTime;
