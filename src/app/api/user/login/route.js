import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (request) => {
  readDB();
  const body = await request.json();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Username or Password is incorrect",
  //   },
  //   { status: 400 }
  // );

  const token = nanoid();

  return NextResponse.json({ ok: true, token });
};
