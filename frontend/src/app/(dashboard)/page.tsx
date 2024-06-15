import { getServerSession } from "next-auth";
import Image from "next/image";
import { authConfig } from "../api/(auth)/auth/[...nextauth]/auth.config";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authConfig);
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
      <Link href="/sign-in">Sign In</Link>
      <Link href={`/p/${session?.user.username}`}>Profile</Link>
      <div className="text-sm">{JSON.stringify(session, null, 2)}</div>
    </div>
  );
}
