require("src/lib/chart.js");

import * as Chartjs from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";

Chartjs.Chart.register(ChartGeo.ChoroplethController);
const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chartjs.Chart.register(...controllers);

