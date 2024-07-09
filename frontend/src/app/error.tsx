"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button type="button" variant="default" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
