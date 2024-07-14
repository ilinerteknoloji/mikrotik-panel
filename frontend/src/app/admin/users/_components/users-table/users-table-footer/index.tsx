import {
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  TotalUsersResponseSchema,
  totalUsersResponseSchema,
} from "@/lib/schema/response/user.schema";
import { fetchBackEnd } from "@/lib/utils/fetch-requests";

type Props = {};

export async function UsersTableFooter({}: Props) {
  const response = await fetchBackEnd("users/count");
  let error: string = "";
  let parsedUsers: TotalUsersResponseSchema | undefined;
  if (response.status)
    parsedUsers = totalUsersResponseSchema.parse(response.data);
  else error = response.message;

  if (!parsedUsers || !parsedUsers.status) return null;
  const [data] = parsedUsers.response;
  return (
    <TableFooter>
      <TableRow>
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
        <TableCell>{data.active_user}</TableCell>
        <TableCell>{data.passive_user}</TableCell>
        <TableCell>{data.user_count}</TableCell>
        <TableCell>{data.active_admin}</TableCell>
        <TableCell>{data.passive_admin}</TableCell>
        <TableCell>{data.admin_count}</TableCell>
        <TableCell>{data.total_count}</TableCell>
      </TableRow>
    </TableFooter>
  );
}
