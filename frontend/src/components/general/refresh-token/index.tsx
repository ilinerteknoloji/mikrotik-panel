"use client";

import { refreshToken } from "@/app/api/(auth)/auth/[...nextauth]/auth.config";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {};

export function RefreshToken({}: Props) {
  const { data: session, update, status } = useSession();

  useEffect(() => {
    const refreshTokenFn = async () => {
      if (!session) return signOut();
      const response = await refreshToken({ ...session });
      if (response.error) return signOut();
      delete response.error;
      const newSession = await update({ ...response });
    };
    const interval = setInterval(refreshTokenFn, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [update, session]);

  //   useEffect(() => {
  //     const visibilityHandler = () =>
  //       document.visibilityState === "visible" && update();
  //     window.addEventListener("visibilitychange", visibilityHandler, false);
  //     return () =>
  //       window.removeEventListener("visibilitychange", visibilityHandler, false);
  //   }, [update]);
  return <span />;

  // return <span />;
}
