import axios from "axios";
const url: any = process.env.REACT_APP_URL_STOCK_DATA_TIME;

//funcion que se conecta al API-ORIGIN-CHALLENGE y trae los datos que seran graficados
const getDataTime = async (data: {
  symbol: string;
  interval: string;
  startDate?: string;
  endDate?: string;
  realTime?: boolean;
}) => {
  //en caso de no seleccionar ningun check usara los de tiempo real
  const symbol = data.symbol.toUpperCase() || "A";
  const interval = data.interval || "5min";
  const startDate = data.startDate;
  const endDate = data.endDate;

  try {
    let response;
    //en caso de usar el tiempo real
    if (data.realTime) {
      response = await axios.get(`${url}/${symbol}/${interval}`);
    } else {
      //en caso de usar el historico
      response = await axios.get(
        `${url}/${symbol}/${interval}/${startDate}/${endDate}`
      );
    }

    return response.data.values;
  } catch (error) {
    console.log(error);
  }
};

export default getDataTime;
