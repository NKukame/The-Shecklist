/*
  Warnings:

  - You are about to drop the column `desrciption` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the `ArtistGenre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ArtistGenre" DROP CONSTRAINT "ArtistGenre_artistId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ArtistGenre" DROP CONSTRAINT "ArtistGenre_genreId_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "desrciption",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."ArtistGenre";

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "albumThumbnail" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "artistLabel" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "reviewSnippet" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumGenre" (
    "albumId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "AlbumGenre_pkey" PRIMARY KEY ("albumId","genreId")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumGenre" ADD CONSTRAINT "AlbumGenre_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumGenre" ADD CONSTRAINT "AlbumGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
