import axios, { AxiosResponse } from "axios";

interface StockData {
  symbol: string;
  interval: string;
  startDate?: string;
  endDate?: string;
  realTime?: boolean;
}

interface StockValue {
  [key: string]: number;
}

type Url = string; // Tipo personalizado para la URL

export async function getDataTime(data: StockData): Promise<StockValue[]> {
  const url: Url = process.env.REACT_APP_URL_STOCK_DATA_TIME as Url;

  const symbol = data.symbol.toUpperCase() || "A";
  const interval = data.interval || "5min";
  const startDate = data.startDate;
  const endDate = data.endDate;

  try {
    let response: AxiosResponse;

    if (data.realTime) {
      response = await axios.get(`${url}/${symbol}/${interval}`);
    } else {
      response = await axios.get(
        `${url}/${symbol}/${interval}/${startDate}/${endDate}`
      );
    }

    return response.data.values;
  } catch (error) {
    console.log(error);
    throw error; // Opcional: relanzar el error para manejarlo en otro lugar
  }
}
