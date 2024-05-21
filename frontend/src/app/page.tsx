"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-5xl">MikroTik</h1>
      <Image
        src="/images/logo.svg"
        alt="MikroTik Logo"
        width={250}
        height={250}
        priority
      />

      <hr />
      <Link href={`/p/${session?.user.username}`}>Profile</Link>
      <hr />
      <div className="w-96">
        <pre>
          {session?.tokens?.accessToken
            ? JSON.stringify(session?.tokens?.accessToken, null, 2)
            : "boş değer"}
        </pre>
        <pre>
          {session?.tokens?.refreshToken
            ? JSON.stringify(session?.tokens?.refreshToken, null, 2)
            : "boş değer"}
        </pre>
        <pre>
          {session?.user ? JSON.stringify(session?.user, null, 2) : "boş değer"}
        </pre>
        <pre>
          {session?.expires
            ? JSON.stringify(session?.expires, null, 2)
            : "boş değer"}
        </pre>
      </div>
    </main>
  );
}
