import "../Forms.css";

function ArtistComp({ formData, setFormData }) {

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
          artistThumbnail: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form action="" className="new-album-form">
        <div className="right-side">
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
          
            <label htmlFor="">Artist Description</label>
            <textarea
              type="text"
              name="descrition"
              value={formData.descrition}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="left-side">
          <div className="form-group">
            <label htmlFor="">Artist Picture</label>
            <input
              type="file"
              name="artistThumbnail"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default ArtistComp;