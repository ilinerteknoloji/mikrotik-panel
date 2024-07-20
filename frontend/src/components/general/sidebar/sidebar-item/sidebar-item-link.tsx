import { NavigationItem } from "@/lib/constant/navigation-items/navigation-item.type";
import { File } from "lucide-react";
import Link from "next/link";

type Props = Readonly<{
  item: NavigationItem;
}>;

export function SidebarItemLink({ item: { title, href, icon } }: Props) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="flex flex-1 items-center gap-2 hover:text-primary"
        >
          {icon ? icon : <File />}
          <p>{title}</p>
        </Link>
      ) : (
        <div className="flex flex-1 items-center gap-2">
          {icon ? icon : <File />}
          <p>{title}</p>
        </div>
      )}
    </>
  );
}
