import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RoutingTablesLayout({ children }: Props) {
  return <>{children}</>;
}
