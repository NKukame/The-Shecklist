import { useState } from "react";
import "../Forms.css";
import genresData from "../../../../../data/genres.json";

function NewAlbumsForm({ formData, setFormData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const genres = genresData.genres;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          albumThumbnail: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => {
      const currentGenres = Array.isArray(prev.genres) ? prev.genres : [];
      if (currentGenres.includes(genre)) {
        return {
          ...prev,
          genres: currentGenres.filter((g) => g !== genre),
        };
      } else {
        return {
          ...prev,
          genres: [...currentGenres, genre],
        };
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <form action="" className="new-album-form">
      <div className="right-side">
        <div className="form-group">
          <label htmlFor="albumName">Album Name</label>
          <input
            type="text"
            name="albumName"
            value={formData.albumName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="artistName">Artist Name</label>
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumThumbnail">Album Thumbnail</label>
          <input
            type="file"
            name="albumThumbnail"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="artistLabel">Artist Label</label>
          <input
            type="text"
            name="artistLabel"
            value={formData.artistLabel}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumReview">Album Review</label>
          <textarea
            name="albumReview"
            value={formData.albumReview}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="left-side">
        <div className="form-group">
          <label htmlFor="genres">Genres</label>
          <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {formData.genres && formData.genres.length > 0
                ? formData.genres.join(", ")
                : "Select Genres"}
              <span className="dropdown-arrow">
                {isDropdownOpen ? "▲" : "▼"}
              </span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {Array.isArray(genres) && genres.length > 0 ? (
                  genres.map((genre, index) => (
                    <span
                      key={`${genre}-${index}`}
                      className={`badge ${
                        formData.genres && formData.genres.includes(genre)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span>No genres available</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="score">Score</label>
          <input
            type="text"
            name="score"
            value={formData.score}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewSnippet">Review Snippet</label>
          <input
            type="text"
            name="reviewSnippet"
            value={formData.reviewSnippet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumReleaseDate">Album Release Date</label>
          <input
            type="date"
            name="albumReleaseDate"
            value={formData.albumReleaseDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

export default NewAlbumsForm;
