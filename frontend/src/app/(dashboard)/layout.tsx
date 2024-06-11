import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100dvh-80px)] w-full bg-secondary">
        <Sidebar />
        <div className="w-full p-4">{children}</div>
      </main>
    </>
  );
}
