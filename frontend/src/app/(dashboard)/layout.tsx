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
      <main className="flex h-dvh w-full bg-secondary">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
