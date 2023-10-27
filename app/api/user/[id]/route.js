import { NextResponse } from "next/server";
import RogueSQL from "@/db/db";

const sql = new RogueSQL();

export async function GET(request, { params }) {
  const { id } = params;
  const data = await sql.userGET(id);
  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  console.log(id);
  const data = await sql.userPUT(id, body.formData);
  return NextResponse.json({ data }, { status: 200 });
}
