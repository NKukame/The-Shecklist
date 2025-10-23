import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import uploadImage from "../../../../lib/upload";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      title: albumName,
      artistName,
      albumThumbnail,
      artistLabel,
      albumReview,
      genres, 
      score,
      reviewSnippet,
      author,
      albumReleaseDate,
    } = await req.json();

    // Validate required fields
    if (!albumName || !artistName) {
      return NextResponse.json(
        { message: "Album Name and Artist Name are required" },
        { status: 400 }
      );
    }

    // Additional validation
    if (!albumReleaseDate || isNaN(new Date(albumReleaseDate).getTime())) {
      return NextResponse.json(
        { message: "Valid Album Release Date is required" },
        { status: 400 }
      );
    }
    if (score && isNaN(parseFloat(score))) {
      return NextResponse.json(
        { message: "Score must be a valid number" },
        { status: 400 }
      );
    }

    // Find artist first
    const artist = await prisma.artist.findFirst({
      where: { name: artistName },
    });

    if (!artist) {
      return NextResponse.json(
        { message: "Artist not found. Please create the artist first." },
        { status: 400 }
      );
    }

    // Check if album already exists
    const existingAlbum = await prisma.album.findFirst({
      where: { title: albumName, artistId: artist.id },
    });

    if (existingAlbum) {
      return NextResponse.json(
        { message: "Album already exists" },
        { status: 409 }
      );
    }

    // Upload thumbnail if provided
    let thumbnailUrl = null;
    if (albumThumbnail && albumThumbnail.startsWith("data:image")) {
      console.log("Uploading albumThumbnail to Cloudinary...");
      thumbnailUrl = await uploadImage(albumThumbnail);
      console.log("Cloudinary upload successful:", thumbnailUrl);
    } else if (albumThumbnail) {
      console.warn(
        "albumThumbnail was not a base64 image string:",
        albumThumbnail.slice(0, 30)
      );
    }



    // Create album
    const newAlbum = await prisma.album.create({
      data: {
        title: albumName,
        albumThumbnail: thumbnailUrl || "",
        releaseDate: new Date(albumReleaseDate),
        artistLabel,
        author,
        reviewSnippet,
        albumReview,
        score, 
        artistId: artist.id,
      },
    });

    // Handle genre relations
    if (Array.isArray(genres) && genres.length > 0) {
      const missingGenres = [];
      for (const genreName of genres) {
        const genre = await prisma.genre.findUnique({
          where: { name: genreName },
        });
        if (genre) {
          await prisma.albumGenre.create({
            data: {
              albumId: newAlbum.id,
              genreId: genre.id,
            },
          });
        } else {
          missingGenres.push(genreName);
        }
      }
      if (missingGenres.length > 0) {
        console.warn("Genres not found in database:", missingGenres);
      }
    }

    return NextResponse.json(
      { message: "Album created successfully", album: newAlbum },
      { status: 201 }
    );
  } catch (error) {
    console.error("Album Creation Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}