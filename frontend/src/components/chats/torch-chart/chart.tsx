"use client";

import { useTorchStore } from "@/stores";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

type Props = {};

export function LineChart({}: Props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  );
  const { labels, rxData, rxPacketsData, txData, txPacketsData } =
    useTorchStore();
  const options = {
    aspectRatio: window.innerHeight > window.innerWidth ? 2 / 1 : 3 / 1,
    resizeDelay: 0,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Torch Chart",
      },
    },
  };
  const data = {
    labels: (labels.length > 10
      ? labels.slice(labels.length - 10)
      : labels
    ).map((item) => item.split(" ")[1]),
    datasets: [
      {
        label: "RX Data",
        data: rxData.length > 10 ? rxData.slice(rxData.length - 10) : rxData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "RX Packets Data",
        data:
          rxPacketsData.length > 10
            ? rxPacketsData.slice(rxPacketsData.length - 10)
            : rxPacketsData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "TX Data",
        data: txData.length > 10 ? txData.slice(txData.length - 10) : txData,
        borderColor: "#FFCD56",
        backgroundColor: "#FFE6AE",
      },
      {
        label: "TX Packets Data",
        data:
          txPacketsData.length > 10
            ? txPacketsData.slice(txPacketsData.length - 10)
            : txPacketsData,
        borderColor: "#4BC0C0",
        backgroundColor: "#ABDFDF",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
