import { SignUpForm } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
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
          <CardTitle>Kayıt ol</CardTitle>
          <CardDescription>
            Hesabınız var mı?{" "}
            <Link href="/sign-in" className="link">
              Giriş yapın
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
