"use client";

import { dataTableSearchParamType } from "@/components/admin/data-table/search-params.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RDnsHosts } from "@/lib/schema/response/rdns-hosts";
import { Prettify } from "@/lib/types/pretiffy.type";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { useRouter } from "next/navigation";

type Props = Readonly<{
  searchParams: Prettify<dataTableSearchParamType & { host?: string }>;
  hosts: RDnsHosts;
}>;

export function DomainFilter({ searchParams, hosts }: Props) {
  const router = useRouter();

  const handleSelect = (host: string) => {
    if (host === "10") {
      delete searchParams?.host;
      return router.push(`?${searchParamsToText({ ...searchParams })}`);
    }
    return router.push(`?${searchParamsToText({ ...searchParams, host })}`);
  };

  return (
    <div className="flex w-full max-w-full items-center justify-end gap-4 md:max-w-fit">
      <Select
        onValueChange={handleSelect}
        defaultValue={hosts[0].hostname}
        name="page-item-count"
      >
        <SelectTrigger className="w-full capitalize md:w-fit">
          <SelectValue placeholder={hosts[0].hostname} />
        </SelectTrigger>
        <SelectContent className="min-w-fit">
          {hosts.map((host) => (
            <SelectItem key={host.id} value={host.hostname}>
              {host.hostname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
