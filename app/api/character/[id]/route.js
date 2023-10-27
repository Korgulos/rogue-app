import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import RogueSQL from "@/db/db";

const sql = new RogueSQL();

export async function GET(request, { params }) {
  const { id } = params;
  const data = await sql.userGET(id);
  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(request) {
  const data = await sql.userPUT("1");
  return NextResponse.json({ data }, { status: 200 });
}
