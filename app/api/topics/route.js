import db_connection from "@/server/config/db.config";
import Topic from "@/server/models/topics.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await db_connection();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await db_connection();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await db_connection();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
