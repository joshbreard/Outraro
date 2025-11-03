import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LineElement, LinearScale, PointElement, TimeScale, Tooltip } from "chart.js";
import "chartjs-adapter-date-fns";

let chartsInitialized = false;

export function initializeCharts() {
  if (chartsInitialized) return;

  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip
  );

  chartsInitialized = true;
}
