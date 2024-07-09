"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {};

export function RefreshToken({}: Props) {
  const { data: session, update, status } = useSession();
  // TODO: Add RefreshToken
  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 2);
    return () => clearInterval(interval);
  }, [update]);

  //   useEffect(() => {
  //     const visibilityHandler = () =>
  //       document.visibilityState === "visible" && update();
  //     window.addEventListener("visibilitychange", visibilityHandler, false);
  //     return () =>
  //       window.removeEventListener("visibilitychange", visibilityHandler, false);
  //   }, [update]);
  // <>
  //   {status} -{" "}
  //   {status === "authenticated"
  //     ? new Date(session.expiresAt).toLocaleString("tr")
  //     : status}
  // </>

  return <span />;
}
