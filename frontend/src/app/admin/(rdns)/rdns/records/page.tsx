import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";

type Props = Readonly<{}>;

export const metadata: Metadata = {
  // TODO: Add metadata RecordsPage
};

export default async function RDnsRecordsPage({}: Props) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>RDns Records</CardTitle>
          <CardDescription>
            Reverse DNS (RDns) is a system that enables the resolution of an IP
            address to a domain name.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
