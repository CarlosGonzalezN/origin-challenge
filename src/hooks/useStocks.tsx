import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface StockData {
  symbol: string;
  name: string;
  currency: string;
}

type Url = string;
//funcion que se conecta al API-ORIGIN-CHALLENGE y trae los datos que seran mostrados en el desplegable

export async function getStocks(): Promise<StockData[]> {
  try {
    const url: Url = process.env.REACT_APP_URL_STOCK_LIST as Url;
    const response: AxiosResponse = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.log(error);
    const navigate = useNavigate();
    navigate("/error");
    return [];
  }
}
