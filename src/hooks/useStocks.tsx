import axios from "axios";
const url: any = process.env.REACT_APP_URL_STOCK_LIST;

//funcion que se conecta al API-ORIGIN-CHALLENGE y trae los datos que seran mostrados en el desplegable
export async function getStocks() {
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
