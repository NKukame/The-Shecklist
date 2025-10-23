"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Funnel, SlidersHorizontal } from "lucide-react";
import Header from "../components/HeaderComp/Header";
import ReviewsCard from "../components/ReviewsCardComp/ReviewsCard";
import './ReviewsPage.css';
import "../App.css"

function Reviews(){
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest");
    const [filter, setFilter] = useState("All");
    const router = useRouter();

    function onClickNav(){
        router.push('/review');
    }

    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const response = await fetch("/api/fetch-albums");
          const data = await response.json();
          if (response.ok) {
            setAlbums(data.albums);
          }
        } catch (error) {
          console.error("Error fetching albums:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAlbums();
    }, []);
    
    return (
      <>
        <div className="review-container">
          <Header />
          <div className="reviews-body">
            <h2>REVIEWS</h2>

            <div className="reviews-controls">
              <div className="custom-reviews-dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => setSortOpen((prev) => !prev)}
                >
                  <SlidersHorizontal size={10} style={{ marginRight: 8 }} />
                  Sort By: {sortBy}
                </button>
                {sortOpen && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => {
                        setSortBy("Newest");
                        setSortOpen(false);
                      }}
                    >
                      Newest
                    </li>
                    <li
                      onClick={() => {
                        setSortBy("Oldest");
                        setSortOpen(false);
                      }}
                    >
                      Oldest
                    </li>
                    <li
                      onClick={() => {
                        setSortBy("Highest Rated");
                        setSortOpen(false);
                      }}
                    >
                      Highest Rated
                    </li>
                    <li
                      onClick={() => {
                        setSortBy("Lowest Rated");
                        setSortOpen(false);
                      }}
                    >
                      Lowest Rated
                    </li>
                  </ul>
                )}
              </div>

              <div className="custom-reviews-dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => setFilterOpen((prev) => !prev)}
                >
                  <Funnel size={10} style={{ marginRight: 8 }} />
                  Filter: {filter}
                </button>
                {filterOpen && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => {
                        setFilter("All");
                        setFilterOpen(false);
                      }}
                    >
                      All
                    </li>
                    <li
                      onClick={() => {
                        setFilter("Positive");
                        setFilterOpen(false);
                      }}
                    >
                      Positive
                    </li>
                    <li
                      onClick={() => {
                        setFilter("Negative");
                        setFilterOpen(false);
                      }}
                    >
                      Negative
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="reviews-body-content">
              {loading ? (
                <div className="loader"></div>
              ) : (
                albums.map((album) => (
                  <ReviewsCard
                    key={album.id}
                    album={album}
                    onClick={() => router.push(`/review/${album.id}`)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default Reviews;