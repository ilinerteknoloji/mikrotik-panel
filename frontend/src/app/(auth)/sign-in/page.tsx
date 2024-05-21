import { SignInForm } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {};

export default async function SignInPage({}: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-96 border-none shadow-none">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="link">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <CardDescription>
            <Link href="/forgot-password" className="link">
              Forgot your password?
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
