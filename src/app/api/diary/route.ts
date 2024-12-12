import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { Diary } from "@/app/types";

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

// POST 요청 처리
export async function POST(request: Request) {
  try {
    const { uri, media_metadata, title, text, cross_post_source } =
      await request.json();

    if (!uri || !media_metadata || !title || !text || !cross_post_source) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDiary: Omit<Diary, "_id"> = {
      uri,
      media_metadata,
      creation_timestamp: Date.now(),
      title,
      text,
      cross_post_source,
    };

    const result = await diaryCollection.insertOne(newDiary);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create diary", error }),
      { status: 500 }
    );
  }
}

// DELETE 요청 처리
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Diary ID is required" },
        { status: 400 }
      );
    }

    const result = await diaryCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Diary not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Diary deleted successfully" });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to delete diary", error }),
      { status: 500 }
    );
  }
}

// PUT 요청 처리
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Diary ID is required" },
        { status: 400 }
      );
    }

    const updates: Partial<Omit<Diary, "_id">> = await request.json();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "No updates provided" },
        { status: 400 }
      );
    }

    const result = await diaryCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Diary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Diary updated successfully" });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to update diary", error }),
      { status: 500 }
    );
  }
}