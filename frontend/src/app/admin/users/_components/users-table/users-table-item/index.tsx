import { TableCell, TableRow } from "@/components/ui/table";
import { UserSchema } from "@/lib/schema/response/user.schema";
import { UserDetailSheet } from "./user-detail-sheet";
import { Badge } from "@/components/ui/badge";

type Props = {
  user: UserSchema;
};

export function UsersTableItem({ user }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell className="capitalize">{user.firstName}</TableCell>
      <TableCell className="uppercase">{user.lastName}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell className="text-center">
        <Badge variant={user.role === "admin" ? "outline" : "secondary"}>
          {user.role}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
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
