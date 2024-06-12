import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { env } from "@/schema";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params: { username } }: Props) {
  const session = await getServerSession(authConfig);
  const response = await fetch(`${env.BACKEND_URL}/users/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.tokens.accessToken.token}`,
    },
  });
  const profile = await response.json();
  return (
    <>
      Profile Page
      <h1>{username}</h1>
      <h1>{session?.user.username}</h1>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="size-96">
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
      <Link href="/sign-in">Sign In</Link>
    </>
  );
}
