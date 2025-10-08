import React from "react";

function SinglesPreview({ singleForm, activeSection }) {
  if (activeSection !== "Single") return null;

  return (
    <div className="album-preview">
      {singleForm.singleThumbnail ? (
        <img src={singleForm.singleThumbnail} alt="Album Thumbnail" />
      ) : null}
      <p>
        <strong>Single Name:</strong> {singleForm.singleName}
      </p>
      <p>
        <strong>Artist Name:</strong> {singleForm.artistName}
      </p>
      <p>
        <strong>Artist Label:</strong> {singleForm.artistLabel}
      </p>
      <p>
        <strong>Single Review:</strong> {singleForm.singleReview}
      </p>
      <p>
        <strong>Genres:</strong> {singleForm.genres}
      </p>
      <p>
        <strong>Score:</strong> {singleForm.score}
      </p>
      <p>
        <strong>Review Snippet:</strong> {singleForm.reviewSnippet}
      </p>
      <p>
        <strong>Author:</strong> {singleForm.author}
      </p>
      <p>
        <strong>Album Release Date:</strong> {singleForm.singleReleaseDate}
      </p>
    </div>
  );
}

export default SinglesPreview;