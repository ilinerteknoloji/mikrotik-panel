import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserSchema } from "@/lib/schema/response/user.schema";
import { UsersTableItem } from "./users-table-item";

type Props = {
  users: UserSchema[];
};

export function UsersTable({ users }: Props) {
  return (
    <Table>
      <TableCaption>
        A table of users. Click on the &quot;Open&quot; button to open the user
        details.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>E-Mail</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Open</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <UsersTableItem key={index} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}
