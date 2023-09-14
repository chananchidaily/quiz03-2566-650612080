import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Chananchida Thawornwong",
    studentId: "650612080",
  });
};
