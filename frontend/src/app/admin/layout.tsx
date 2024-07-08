import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100dvh-80px)] bg-secondary">
        <Sidebar type="admin" />
        <div className="w-full p-4 md:w-[calc(100%-192px)] lg:w-[calc(100%-256px)]">
          {children}
        </div>
      </main>
    </>
  );
}
