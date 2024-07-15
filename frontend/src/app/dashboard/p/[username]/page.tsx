import { authConfig } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { UpdateProfileForm } from "@/components/forms/update-profile";
import { ServerAlerts } from "@/components/general/server-alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/lib/schema/env";
import { userResponseSchema } from "@/lib/schema/response/user/user.schema";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params: { username } }: Props) {
  const session = await getServerSession(authConfig);
  const response = await fetch(`${env.BACKEND_URL}/users/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const responseJson = await response.json();
  const parsedResponse = userResponseSchema.safeParse(responseJson);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!parsedResponse.success
          ? parsedResponse.error.errors.map((error, index) => (
              <ServerAlerts
                key={index}
                title="Error"
                description={error.path.join(".") + ": " + error.message}
              />
            ))
          : null}
        {parsedResponse.success && !parsedResponse.data.status ? (
          <ServerAlerts title="Error" description={parsedResponse.data.error} />
        ) : null}
      </div>

      <ServerAlerts
        title="Error"
        description={session?.expiresAt.toString() ?? ""}
      />

      <Card>
        <CardHeader>
          <CardTitle>{username} Profile</CardTitle>
          <CardDescription>
            This is the profile page for {username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          Profile Page
          <h1>{username}</h1>
          <div className="max-w-[500px] hyphens-auto break-words">
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
          <UpdateProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
