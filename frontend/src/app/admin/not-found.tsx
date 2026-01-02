import Link from "next/link";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/dashboard" className="link">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
