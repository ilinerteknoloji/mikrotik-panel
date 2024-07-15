import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserSchema } from "@/lib/schema/response/user/user.schema";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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
        <Link
          href="/admin/users/[username]"
          as={`/admin/users/${user.username}`}
        >
          <ExternalLink />
        </Link>
        {/* <UserDetailSheet userId={user.id} /> */}
      </TableCell>
    </TableRow>
  );
}
