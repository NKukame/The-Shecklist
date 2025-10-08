import "../Forms.css";

function SinglesForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <form action="" className="new-album-form">
        <div className="right-side">
          <div className="form-group">
            <label htmlFor="">Single Name</label>
            <input
              type="text"
              name="singleName"
              value={formData.singleName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Artist Name</label>
            <input
              type="text"
              name="artistName"
              value={formData.artistName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Single Thumbnail</label>
            <input
              type="text"
              name="singleThumbnail"
              value={formData.singleThumbnail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Artist Label</label>
            <input
              type="text"
              name="artistLabel"
              value={formData.artistLabel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Single Review</label>
            <textarea
              name="singleReview"
              value={formData.singleReview}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="left-side">
          <div className="form-group">
            <label htmlFor="">Genres</label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Score</label>
            <input
              type="text"
              name="score"
              value={formData.score}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Review Snippet</label>
            <input
              type="text"
              name="reviewSnippet"
              value={formData.reviewSnippet}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Single Release Date</label>
            <input
              type="text"
              name="singleReleaseDate"
              value={formData.singleReleaseDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SinglesForm;