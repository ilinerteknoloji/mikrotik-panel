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
            Ad
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="lastName">
            Soyad
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="username">
            Kullanıcı Adı
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="email">
            E-Mail
          </UsersTableHead>
          <UsersTableHead typeofValue="string" keyofValue="phoneNumber">
            Telefon Numarası
          </UsersTableHead>
          <UsersTableHead
            className="text-center"
            typeofValue="string"
            keyofValue="role"
          >
            Rol
          </UsersTableHead>
          <UsersTableHead
            className="text-center"
            typeofValue="string"
            keyofValue="status"
          >
            Durum
          </UsersTableHead>
          <TableHead className="text-center">Aç</TableHead>
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
