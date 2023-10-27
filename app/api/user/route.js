import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import RogueSQL from "@/db/db";

const sql = new RogueSQL();

export async function GET(request) {
  const data = await sql.usersGET();
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  console.log(body.formData.fr_name);
  const data = await sql.userPOST(body.formData);
  return NextResponse.json({ data }, { status: 200 });
}
