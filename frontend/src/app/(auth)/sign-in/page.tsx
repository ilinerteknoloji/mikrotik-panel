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
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınız yok mu?{" "}
            <Link href="/sign-up" className="link">
              Kayıt olun
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <CardDescription>
            <Link href="/forgot-password" className="link">
              Şifrenizi mi unuttunuz?
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
