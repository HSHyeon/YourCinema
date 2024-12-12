// src/app/api/diary/route.ts
import { NextResponse } from "next/server";
import { Db, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("CinemaDiary");
const diaryCollection = db.collection("diaries");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const diaries = await diaryCollection
    .find()
    .skip((page - 1) * limit) // skip 처리
    .limit(limit) // limit 처리
    .toArray();

  return new Response(JSON.stringify(diaries), { status: 200 });
}

export async function POST(request: Request) {
  const { content, title } = await request.json();
  const result = await diaryCollection.insertOne({
    content,
    title,
    creation_timestamp: Date.now(),
  });
  return NextResponse.json(result);
}
