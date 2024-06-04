"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-5xl">MikroTik</h1>
      <Image
        src="/images/logo.svg"
        alt="MikroTik Logo"
        width={250}
        height={250}
        priority
      />
      <Link href={`/p/${session?.user.username}`}>Profile</Link>
    </div>
  );
}
