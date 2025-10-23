import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {

    const albums = await prisma.album.findMany({
      include: {
        artist: true,
        genres: {
          include: {
            genre: true
          }
        }
      }
    });

    return NextResponse.json(
      { albums },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetching Albums Error:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Fetching Albums", error: error.message },
      { status: 500 }
    );
  }
}
