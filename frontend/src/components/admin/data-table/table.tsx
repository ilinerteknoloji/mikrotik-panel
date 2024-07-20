import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableWithOrderBy } from "./table-header-with-order-by";
import { DataTableRow } from "./table-row";

type Props<T> = Readonly<{
  data: T[];
  tableCaption?: string;
  headerData: {
    key?: keyof T | string;
    label: string;
    data: (data: T) => unknown;
    className?: string;
  }[];
}>;

export function DataTable<T extends Record<string, unknown>>({
  data,
  tableCaption,
  headerData,
}: Props<T>) {
  return (
    <Table>
      {tableCaption ? <TableCaption>{tableCaption}</TableCaption> : null}
      <TableHeader>
        <TableRow>
          {headerData.map((header, index) =>
            header.key ? (
              <DataTableWithOrderBy
                key={index}
                typeofValue="string"
                keyofValue={header.key.toString()}
              >
                {header.label}
              </DataTableWithOrderBy>
            ) : (
              <TableHead key={index} className="capitalize">
                {header.label}
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>

      <TableBody suppressHydrationWarning>
        {data.map((item, index) => (
          <DataTableRow key={index} data={item} headerData={headerData} />
        ))}
      </TableBody>
    </Table>
  );
}
