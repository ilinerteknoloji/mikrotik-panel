import {
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { fetchUserCount } from "@/lib/utils/fetch-requests/user/count";

type Props = {};

export async function UsersTableFooter({}: Props) {
  const response = await fetchUserCount();
  if (!response.status) return null;
  const {
    data: [data],
  } = response;

  return (
    <TableFooter>
      {/* <TableRow>
        <TableHead></TableHead>
        <TableHead></TableHead>
        <TableHead>Active User</TableHead>
        <TableHead>Passive User</TableHead>
        <TableHead>Total User</TableHead>
        <TableHead>Active Admin</TableHead>
        <TableHead>Passive Admin</TableHead>
        <TableHead>Total Admin</TableHead>
        <TableHead>Total</TableHead>
      </TableRow>

      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{data.active_admin}</TableCell>
        <TableCell>{data.passive_user}</TableCell>
        <TableCell>{data.user_count}</TableCell>
        <TableCell>{data.active_admin}</TableCell>
        <TableCell>{data.passive_admin}</TableCell>
        <TableCell>{data.admin_count}</TableCell>
        <TableCell>{data.total_count}</TableCell>
      </TableRow> */}
      <TableRow>
        <TableCell colSpan={8}>Total:</TableCell>
        <TableCell className="text-right">{data.total_count}</TableCell>
      </TableRow>
    </TableFooter>
  );
}
