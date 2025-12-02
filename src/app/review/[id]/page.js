import Header from "../../components/HeaderComp/Header";
import Link from "next/link";
import "./Reviews.css";

async function fetchAlbum(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch-album/${id}`, {
    cache: 'no-store'
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.album;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const album = await fetchAlbum(id);
  
  if (!album) {
    return {
      title: 'Album Not Found',
    };
  }

  return {
    title: `${album.title} by ${album.artist.name} - Review`,
    description: `${album.reviewSnippet} Read our full review of ${album.title} by ${album.artist.name}. Score: ${album.score}/10`,
    keywords: `${album.artist.name}, ${album.title}, album review, music review, ${album.genres.map(g => g.genre.name).join(', ')}`,
    openGraph: {
      title: `${album.title} by ${album.artist.name} - Review`,
      description: album.reviewSnippet,
      images: [album.albumThumbnail],
      type: 'article',
    },
  };
}

async function Reviews({ params }) {
  const { id } = await params;
  const album = await fetchAlbum(id);

  if (!album) return <div>Album not found</div>;

  return (
    <section className="reviews-page-container">
        <Header />

        <div className="reviews-page-body">
          <div className="reviews-page-top-section">
            <div className="reviews-page-top-section-album-img-container">
              <img
                src={album.albumThumbnail}
                alt={`${album.title} Cover`}
                className="reviews-page-cover-img"
              />
            </div>
            <div className="reviews-page-top-section-text-content">
              <h1 className="reviews-page-album-title">{album.title}</h1>
              <Link href="/artist-page">
                <p className="reviews-page-artist-name">{album.artist.name}</p>
              </Link>
              <p className="reviews-page-artist-label">Label: {album.artistLabel}</p>
              <p className="reviews-page-release-date">
                Released: {new Date(album.releaseDate).toLocaleDateString()}
              </p>
              <p className="reviews-page-review-author">
                Author: {album.author}
              </p>
              <p className="reviews-page-genre-tags">
                {album.genres.map(({ genre }) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>
            <div className="reviews-page-top-section-score-container">
              <h2 className="reviews-page-score">Score: {album.score}</h2>
              <p className="reviews-page-review-snippet">
                {album.reviewSnippet}
              </p>
            </div>
          </div>
          <div className="reviews-page-review-section">
            <h2>Review</h2>
            <p className="reviews-page-review-text">{album.albumReview}</p>
          </div>
        </div>
    </section>
  );
}

export default Reviews;
