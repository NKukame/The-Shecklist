import React from "react";

function AlbumPreview({ albumForm, activeSection }) {
  if (activeSection !== "New Review") return null;

  return (
    <div className="album-preview">
      {albumForm.albumThumbnail ? (
        <img src={albumForm.albumThumbnail} alt="Album Thumbnail" />
      ) : null}
      <p>
        <strong>Album Name:</strong> {albumForm.albumName}
      </p>
      <p>
        <strong>Artist Name:</strong> {albumForm.artistName}
      </p>
      <p>
        <strong>Artist Label:</strong> {albumForm.artistLabel}
      </p>
      <p>
        <strong>Album Review:</strong> {albumForm.albumReview}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {Array.isArray(albumForm.genres) && albumForm.genres.length > 0
          ? albumForm.genres.join(", ")
          : "No genres selected"}
      </p>
      <p>
        <strong>Score:</strong> {albumForm.score}
      </p>
      <p>
        <strong>Review Snippet:</strong> {albumForm.reviewSnippet}
      </p>
      <p>
        <strong>Author:</strong> {albumForm.author}
      </p>
      <p>
        <strong>Album Release Date:</strong> {albumForm.albumReleaseDate}
      </p>
    </div>
  );
}

export default AlbumPreview;