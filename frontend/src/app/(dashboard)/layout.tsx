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
      <main className="flex min-h-[calc(100dvh-80px)] bg-secondary">
        <Sidebar />
        <div className="w-full p-4 md:w-[calc(100%-192px)] lg:w-[calc(100%-256px)]">
          {children}
        </div>
      </main>
    </>
  );
}
