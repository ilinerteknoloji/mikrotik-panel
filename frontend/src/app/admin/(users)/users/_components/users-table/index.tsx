import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersTableItem } from "./users-table-item";
import { UserSchema } from "@/lib/schema/response/user/user.schema";
import { UsersTableHead } from "./usert-table-head";

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
          <UsersTableHead
            className="w-[100px] font-semibold"
            typeofValue="number"
            keyofValue="id"
          >
            ID
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="firstName">
            First Name
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="lastName">
            Last Name
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="username">
            Username
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="email">
            E-Mail
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="phoneNumber">
            Phone Number
          </UsersTableHead>
          <UsersTableHead
            className="text-center"
            typeofValue="string"
            keyofValue="role"
          >
            Role
          </UsersTableHead>
          <UsersTableHead
            className="text-center"
            typeofValue="string"
            keyofValue="status"
          >
            Status
          </UsersTableHead>
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
