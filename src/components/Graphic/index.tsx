import { useEffect } from "react";
import Highcharts from "highcharts";

interface Value {
  datetime: string;
  close: any;
}

interface GraphicProps {
  data: Value[];
  logo: string;
}

const Graphic: React.FC<GraphicProps> = ({ data, logo }) => {
  const values = data;
  const closingValues = values.map((value) => ({
    x: Date.parse(value.datetime),
    x2: Date.parse(value.datetime),
    y: parseFloat(value.close),
  }));

  useEffect(() => {
    const options: Highcharts.Options = {
      title: {
        text: logo,
      },
      xAxis: {
        type: "datetime",
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

    Highcharts.chart("chart-container", options);
  }, [data]);

  return <div id="chart-container" />;
};

export default Graphic;
