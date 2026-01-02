import { APP_NAME } from "@/lib/constant/app.constant";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata AppPage
};

export default async function HomePage({}: Props) {
  return (
    <main className="grid min-h-screen w-full place-items-center">
      <h1 className="text-center text-xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl">
        {APP_NAME}
      </h1>
    </main>
  );
}
