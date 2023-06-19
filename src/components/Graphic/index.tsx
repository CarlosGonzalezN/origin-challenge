import { useEffect } from "react";
import Highcharts from "highcharts";

interface Value {
  datetime: string;
  close: any;
}

interface GraphicProps {
  data: Value[];
}

const Graphic: React.FC<GraphicProps> = ({ data }) => {
  console.log(data);

  const values = data;
  const closingValues = values.map((value) => ({
    x: Date.parse(value.datetime),
    x2: Date.parse(value.datetime),
    y: parseFloat(value.close),
  }));

  useEffect(() => {
    // Configuración del gráfico
    const options: Highcharts.Options = {
      title: {
        text: "Valores de Cierre",
      },
      xAxis: {
        type: "datetime", // Cambiado a tipo datetime
      },
      yAxis: {
        title: {
          text: "Cierre",
        },
      },
      series: [
        {
          name: "Cierre",
          type: "line",
          data: closingValues,
        },
      ],
    };

    // Crear el gráfico
    Highcharts.chart("chart-container", options);
  }, [data]);

  return <div id="chart-container" />;
};

export default Graphic;
