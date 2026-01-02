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
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-3">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button type="button" variant="default" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
