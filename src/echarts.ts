import * as echarts from "echarts/core";
import { PieChart, GaugeChart } from "echarts/charts";
import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GaugeChart,
  PieChart,
  CanvasRenderer,
]);
