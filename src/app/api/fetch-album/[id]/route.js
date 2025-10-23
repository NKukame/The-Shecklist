import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        artist: true,
        genres: {
          include: {
            genre: true
          }
        }
      }
    });

    if (!album) {
      return NextResponse.json(
        { message: "Album Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { album },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetching Album Error:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Fetching An Album", error: error.message },
      { status: 500 }
    );
  }
}
