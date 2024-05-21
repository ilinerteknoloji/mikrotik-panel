import { SignUpForm } from "@/components/forms";
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

export default async function SignUpPage({}: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-96 border-none shadow-none">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link href="/sign-in" className="link">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
