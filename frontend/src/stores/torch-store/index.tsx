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
            labels: [...state.labels, data[0]],
            rxData: [...state.rxData, data[1]],
            rxPacketsData: [...state.rxPacketsData, data[2]],
            txData: [...state.txData, data[3]],
            txPacketsData: [...state.txPacketsData, data[4]],
          };
        });
      },
    }),
    {
      name: "torch-store",
    },
  ),
);
