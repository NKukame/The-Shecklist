import React from "react";

function AlbumPreview({ artistForm, activeSection }) {
  if (activeSection !== "Artist") return null;

  return (
    <div className="album-preview">
      {artistForm.artistThumbnail ? (
        <img src={artistForm.artistThumbnail} alt="Artist Thumbnail" />
      ) : null}
      <p>
        <strong>Artist Name:</strong> {artistForm.artistName}
      </p>
      <p>
        <strong>Genres:</strong> {artistForm.genres}
      </p>
      <p>
        <strong>Artist Description:</strong> {artistForm.descrition}
      </p>
    </div>
  );
}

export default AlbumPreview;