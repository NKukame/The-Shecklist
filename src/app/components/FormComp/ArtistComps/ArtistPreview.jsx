import React from "react";
import Image from "next/image";

function AlbumPreview({ artistForm, activeSection }) {
  if (activeSection !== "Artist") return null;

  return (
    <div className="album-preview">
      {artistForm.artistThumbnail ? (
        <Image src={artistForm.artistThumbnail} alt="Artist Thumbnail" width={250} height={250}/>
      ) : null}
      <p>
        <strong>Artist Name:</strong> {artistForm.artistName}
      </p>
      <p>
        <strong>Artist Description:</strong> {artistForm.descrition}
      </p>
    </div>
  );
}

export default AlbumPreview;