import { FC } from "react";
import { CaloricBreakdownType } from "types/recipeAjax";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

interface PropsType {
  caloricBreakdown: CaloricBreakdownType;
  title: string;
}

const ChartBox: FC<PropsType> = ({ caloricBreakdown, title }) => {
  const { percentCarbs, percentFat, percentProtein } = caloricBreakdown;
  const option = {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%",
    },
    legend: {
      orient: "vertical",
      left: "top",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          {
            name: "carbohydrate",
            value: percentCarbs,
          },
          {
            name: "fat",
            value: percentFat,
          },
          {
            name: "protein",
            value: percentProtein,
          },
        ],
        label: {
          show: true,
          formatter: "{b}: {c}%",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
        height: "500px",
        maxWidth: "700px",
      }}
    />
  );
};

export default ChartBox;
