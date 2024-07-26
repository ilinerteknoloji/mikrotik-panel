import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Link from "next/link";

type Props = Readonly<{
  href: string;
}>;

export function ClearFilters({ href }: Props) {
  return (
    <Link href={href} className="w-full md:w-fit">
      <Button
        variant="destructive"
        size="icon"
        className="w-full px-2 md:w-fit"
      >
        <XIcon />
      </Button>
    </Link>
  );
}
