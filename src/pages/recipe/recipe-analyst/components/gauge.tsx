import { FC } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

interface PropsType {
  name: string;
  amount: number;
}

const GaugeBox: FC<PropsType> = ({ name, amount }) => {
  const option = {
    title: {
      text: name,
      left: "center",
      bottom: "bottom",
    },
    tooltip: {
      position: "top",
      formatter: "{b} : {c}%",
    },
    series: [
      {
        name,
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          fontSize: 20,
        },
        data: [
          {
            value: amount,
            name: name,
          },
        ],
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{
        width: "100%",
        height: "300px",
        maxWidth: "400px",
      }}
    />
  );
};

export default GaugeBox;
