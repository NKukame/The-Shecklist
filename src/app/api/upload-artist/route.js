import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import uploadImage from "../../../../lib/upload";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, description, thumbnail } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 }
      );
    }

    // Check if artist already exists
    const existingArtist = await prisma.artist.findFirst({
      where: { name },
    });

    if (existingArtist) {
      return NextResponse.json(
        { message: "Artist already exists" },
        { status: 409 }
      );
    }

    let thumbnailUrl = null;

    // Only attempt upload if thumbnail is a valid base64 string
    if (thumbnail && thumbnail.startsWith("data:image")) {
      console.log("Uploading thumbnail to Cloudinary...");
      thumbnailUrl = await uploadImage(thumbnail);
      console.log("Cloudinary upload successful:", thumbnailUrl);
    } else if (thumbnail) {
      console.warn("Thumbnail was not a base64 image string:", thumbnail.slice(0, 30));
    }

    // Create new artist
    const newArtist = await prisma.artist.create({
      data: {
        name,
        description,
        thumbnail: thumbnailUrl || "",
      },
    });

    return NextResponse.json(
      { message: "Artist created successfully", artist: newArtist },
      { status: 201 }
    );

  } catch (error) {
    console.error("Artist creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
