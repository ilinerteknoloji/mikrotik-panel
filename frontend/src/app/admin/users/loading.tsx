import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersPageLoading() {
  return (
    <section className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage users. Click on the &quot;Open&quot; button to open the user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A table of users. Click on the &quot;Open&quot; button to open the
              user details.
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
              {Array.from({ length: 10 }).map((_, index) => (
                <UsersTableRowSkeleton key={index} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}

function UsersTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="w-[100px]">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    </TableRow>
  );
}
