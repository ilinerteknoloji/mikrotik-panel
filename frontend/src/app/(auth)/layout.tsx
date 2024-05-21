"use client";

import { Card, CardContent } from "@/components/ui/card";
import { World } from "@/components/world";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="flex h-screen w-full flex-col items-center justify-center gap-4 shadow-lg lg:w-1/3"
      >
        <Card className="w-96 border-none shadow-none">
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/images/logo.svg"
                alt="MikroTik Logo"
                width={100}
                height={100}
                className="drop-shadow"
              />
              <div>
                <h1 className="text-xl font-semibold leading-none tracking-tight">
                  MikroTik Panel
                </h1>
                <p className="text-sm text-gray-500">
                  A simple panel to manage MikroTik devices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div>{children}</div>
      </motion.div>
      <div
        className="hidden w-full items-center justify-center lg:flex"
        suppressHydrationWarning
      >
        <World />
      </div>
    </main>
  );
}
