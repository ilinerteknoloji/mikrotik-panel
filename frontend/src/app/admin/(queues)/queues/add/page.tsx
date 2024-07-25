import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import { QueueForm } from "./_form/form";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata AddPage
};

export default async function AddPage({}: Props) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Add Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-[500px] max-w-full">
            <QueueForm />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
