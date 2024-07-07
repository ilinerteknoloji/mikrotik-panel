import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export function ServerAlerts({ title, description }: Props) {
  return (
    <Alert variant="default">
      <CircleAlert />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
