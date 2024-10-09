import { Button } from "@/components/ui/button";
import { FormAction } from "@/lib/types";
import { searchParamsToText } from "@/lib/utils/search-params-to-text";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { dataTableSearchParamType } from "./search-params.type";

type Props<T, K> = Readonly<{
  searchParams: T;
  fetchData: (searchParams: T) => Promise<FormAction<K>>;
}>;

export async function DataTablePagination<
  T extends dataTableSearchParamType,
  K extends Array<any>,
>({ searchParams, fetchData }: Props<T, K>) {
  if (searchParams?.limit && searchParams.limit === 10)
    delete searchParams.limit;
  const prevPage = +searchParams.page - 1;
  const nextPage = +searchParams.page + 1;

  const response = await fetchData({
    ...searchParams,
    page: nextPage,
  });
  const isExist = response.status ? response.data.length > 0 : false;

  return (
    <div className="flex w-full justify-end gap-4">
      {searchParams.page == 1 ? (
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
          disabled
        >
          <ArrowLeft className="size-4" /> Önceki
        </Button>
      ) : (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: prevPage })}`}
        >
          <Button
            type="button"
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" /> Önceki
          </Button>
        </Link>
      )}

      {isExist ? (
        <Link
          href={`?${searchParamsToText({ ...searchParams, page: nextPage })}`}
        >
          <Button
            type="button"
            variant="ghost"
            className="flex items-center gap-2"
          >
            Sonraki <ArrowRight className="size-4" />
          </Button>
        </Link>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2"
          disabled
        >
          Sonraki <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  );
}
