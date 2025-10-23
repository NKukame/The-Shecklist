import Image from "next/image";
import "./ReviewsCard.css";

function ReviewsCard({ album, onClick }) {
  return (
    <>
      <div className="reviews-card" onClick={onClick}>
        <Image
          src={album.albumThumbnail}
          alt={`${album.title} Cover`}
          className="cover-img"
          width={250}
          height={250}
        />
        <div className="reviews-card-text-content">
          <h3>{album.artist.name}</h3>
          <p className="reviews-card-album-title">{album.title}</p>
          <p className="reviews-card-review-snippet">{album.reviewSnippet}</p>
        </div>
        <div className="genre-tags">
          {album.genres.length > 0 && (
            <span className="genre-tag">{album.genres[0].genre.name}</span>
          )}
          {album.genres.length > 1 && (
            <span className="genre-tag">+{album.genres.length - 1}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewsCard;