import { ServerAlerts } from "@/components/general/server-alerts";
import { getUserByUsernameOrId } from "@/lib/utils/fetch-requests/user/get-user";
import type { Metadata } from "next";

type Props = {
  params: {
    username: string;
  };
};

export const metadata: Metadata = {
  // TODO: Add metadata [username]Page
};

export default async function UserDetailPage({ params: { username } }: Props) {
  const response = await getUserByUsernameOrId(username);
  if (!response.status)
    return <ServerAlerts title="Error" description={response.message} />;
  const { data } = response;

  const objectToString = (obj: object): React.ReactNode => {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {typeof value === "object" &&
            typeof value !== null &&
            typeof value !== undefined
              ? Array.isArray(value)
                ? value.join(", ")
                : objectToString(value ?? {})
              : value
                ? value
                : "N/A"}
          </li>
        ))}
      </ul>
    );
  };
  // TODO: Make prettier and add more details

  return <div>{objectToString(data)}</div>;
}
