import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-5xl">MikroTik</h1>
      <Image
        src="/images/logo.svg"
        alt="MikroTik Logo"
        width={250}
        height={250}
      />
    </main>
  );
}
