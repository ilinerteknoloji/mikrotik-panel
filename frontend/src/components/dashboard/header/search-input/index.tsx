import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type Props = {};

export function SearchInput({}: Props) {
  return (
    <div className="flex w-full items-center rounded-full border pl-2 shadow">
      <SearchIcon className="size-6" />
      <Input
        placeholder="Search"
        className="rounded-full border-none shadow-none outline-none focus-visible:ring-0"
      />
    </div>
  );
}
