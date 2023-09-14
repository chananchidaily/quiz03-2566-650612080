import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  let totalRooms = DB.rooms.length;
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload || (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN"))
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();

  const body = await request.json();
  const { roomName } = body;
  if (DB.rooms.find((room) => roomName === roomName)) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();
  DB.rooms.push({
    roomID,
    roomName,
  });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
