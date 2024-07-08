import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  labels: string[];
  rxData: number[];
  rxPacketsData: number[];
  txData: number[];
  txPacketsData: number[];
};

type Actions = {
  setData: (data: [string, number, number, number, number]) => void;
};

export const useTorchStore = create(
  persist<State & Actions>(
    (set) => ({
      labels: [],
      rxData: [],
      rxPacketsData: [],
      txData: [],
      txPacketsData: [],
      setData: (data) => {
        set((state) => {
          return {
            labels: [data[0], ...state.labels],
            rxData: [data[1], ...state.rxData],
            rxPacketsData: [data[2], ...state.rxPacketsData],
            txData: [data[3], ...state.txData],
            txPacketsData: [data[4], ...state.txPacketsData],
          };
        });
      },
    }),
    {
      name: "torch-store",
    },
  ),
);
