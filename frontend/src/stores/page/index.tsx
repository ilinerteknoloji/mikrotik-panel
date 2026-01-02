import { allPages } from "@/lib/constant/navigation-items/all-pages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PageName = (typeof allPages)[number]["title"];
type Href = (typeof allPages)[number]["href"];

type State = {
  pageName: PageName;
  href: Href;
};

type Actions = {
  setPage: (pageName: PageName, href: Href) => void;
};

export const usePageStore = create(
  persist<State & Actions>(
    (set) => ({
      pageName: "Home",
      href: "/",
      setPage: (pageName = "Home", href = "/") => {
        set((state) => {
          return {
            pageName: pageName ?? state.pageName,
            href: href ?? state.href,
          };
        });
      },
    }),
    {
      name: "page-store",
    },
  ),
);
