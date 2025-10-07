"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Header from "../components/HeaderComp/Header";
import NewAlbumsForm from "../components/FormComp/NewAlbumsComps/NewAlbumsForm";
import AlbumPreview from "../components/FormComp/NewAlbumsComps/AlbumPreview";
import ArtistComp from "../components/FormComp/ArtistComps/ArtistComp";
import ArtistPreview from "../components/FormComp/ArtistComps/ArtistPreview"; 
import "./Admin.css";

function Admin() {
  const [activeSection, setActiveSection] = useState("New Review");
  const router = useRouter();
  const [albumForm, setAlbumForm] = useState({
    albumName: "",
    artistName: "",
    albumThumbnail: "",
    artistLabel: "",
    albumReview: "",
    genres: "",
    score: "",
    reviewSnippet: "",
    author: "",
    albumReleaseDate: "",
  });
  const [artistForm, setArtistForm] = useState({
    artistName: "",
    artistThumbnail: "",
    descrition: "",
    genres: "",
  });

  const renderForm = () => {
    switch (activeSection) {
      case "New Review":
        return <NewAlbumsForm formData={albumForm} setFormData={setAlbumForm}/>;
      case "Single":
        return (
          <div>
            <p>Single form placeholder (Coming soon)</p>
          </div>
        );
      case "Artist":
        return <ArtistComp formData={artistForm} setFormData={setArtistForm}/>;
      case "Genre":
        return (
          <div>
            <p>Genre form placeholder (Coming soon)</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    switch (activeSection) {
      case "New Review":
        return <AlbumPreview albumForm={albumForm} activeSection={activeSection} />
      case "Single":
        return (
          <div>
            <p>Still In Construction</p>
          </div>
        );
      case "Artist":
        return <ArtistPreview artistForm={artistForm} activeSection={activeSection} />
      case "Genre":
        return (
          <div>
            <p>Still In Construction</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <div className="admin-body">
        <section className="admin-dashboard">
          <aside className="admin-dashboard-sidebar">
            <h5>Admin Dashboard</h5>
            <div className="admin-sidebar-items-container">
              {["New Review", "Single", "Artist", "Genre", "Logout"].map((item) => (
                <div
                  key={item}
                  className={`admin-sidebar-item ${
                    activeSection === item ? "active" : ""
                  }`}
                  onClick={() => {
                    if (item === "Logout") {
                        router.push("/");
                    }
                    setActiveSection(item);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="admin-dashboard-forms">
            <main>
              <h3>{activeSection}</h3>
              {renderForm()}
              <button type="submit">Submit</button>
            </main>
          </div>

          <div className="admin-dashboard-preview-section">
            <section>
                <h4>Preview</h4>
                {renderPreview()}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;