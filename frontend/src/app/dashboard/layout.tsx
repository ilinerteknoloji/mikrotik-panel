import { Header } from "@/components/general/header";
import { Sidebar } from "@/components/general/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header type="dashboard" />
      <main className="flex min-h-[calc(100dvh-80px)] bg-secondary">
        <Sidebar type="dashboard" />
        <div className="w-full p-4 md:w-[calc(100%-192px)] lg:w-[calc(100%-256px)]">
          {children}
        </div>
      </main>
    </>
  );
}
