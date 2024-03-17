import { NextResponse } from "next/server";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

export async function POST() {
  try {
    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}
