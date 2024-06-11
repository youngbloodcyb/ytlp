import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  const response = await fetch(process.env.ROUTER_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ROUTER_API_KEY!}`,
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok)
    return NextResponse.json("An error occurred", { status: 500 });

  const data = await response.json();
  console.log(data);

  return NextResponse.json(data);
}
