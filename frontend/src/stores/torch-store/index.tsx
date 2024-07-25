import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  labels: number[];
  rxData: number[];
  rxPacketsData: number[];
  txData: number[];
  txPacketsData: number[];
};

type Actions = {
  setData: (data: [number, number, number, number, number]) => void;
};

export const useTorchStore = create(
  persist<State & Actions>(
    (set) => ({
      labels: Array(100).fill(0),
      rxData: Array(100).fill(0),
      rxPacketsData: Array(100).fill(0),
      txData: Array(100).fill(0),
      txPacketsData: Array(100).fill(0),
      setData: (data) => {
        set((state) => {
          const MAX_DATA_POINTS = 100;

          return {
            labels: [data[0], ...state.labels].slice(0, MAX_DATA_POINTS),
            rxData: [data[1], ...state.rxData].slice(0, MAX_DATA_POINTS),
            rxPacketsData: [data[2], ...state.rxPacketsData].slice(
              0,
              MAX_DATA_POINTS,
            ),
            txData: [data[3], ...state.txData].slice(0, MAX_DATA_POINTS),
            txPacketsData: [data[4], ...state.txPacketsData].slice(
              0,
              MAX_DATA_POINTS,
            ),
          };
        });
      },
    }),
    {
      name: "torch-store",
    },
  ),
);
