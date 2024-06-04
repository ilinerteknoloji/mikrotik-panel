"use server";

import { env } from "@/schema";

export async function POST(req: Request) {
  const values = await req.json();

  const response = await fetch(`${env.BACKEND_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const data = await response.json();
    return Response.json(data.response, { status: response.status });
  }
  return Response.json(
    { message: "User created successfully" },
    { status: 201 },
  );
}
