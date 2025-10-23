"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/HeaderComp/Header";
import Link from "next/link";
import "./Reviews.css";

function Reviews() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/fetch-album/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setAlbum(data.album);
        }
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAlbum();
    }
  }, [params.id]);

  if (loading) return <div className="loader"></div>;
  if (!album) return <div>Album not found</div>;

  return (
    <>
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
    </>
  );
}

export default Reviews;
