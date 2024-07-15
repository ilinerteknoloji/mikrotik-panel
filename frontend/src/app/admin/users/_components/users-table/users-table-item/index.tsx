import { TableCell, TableRow } from "@/components/ui/table";
import { UserDetailSheet } from "./user-detail-sheet";
import { Badge } from "@/components/ui/badge";
import { UserSchema } from "@/lib/schema/response/user/user.schema";

type Props = {
  user: UserSchema;
};

export function UsersTableItem({ user }: Props) {
  return (
    <TableRow>
      <TableCell className="font-semibold">{user.id}</TableCell>
      <TableCell className="capitalize">{user.firstName}</TableCell>
      <TableCell className="uppercase">{user.lastName}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>
        <Badge variant={user.role === "admin" ? "outline" : "secondary"}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={user.status ? "default" : "destructive"}>
          {user.status ? "Active" : "Passive"}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <UserDetailSheet userId={user.id} />
      </TableCell>
    </TableRow>
  );
}
