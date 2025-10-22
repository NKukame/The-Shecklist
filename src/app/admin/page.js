"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Header from "../components/HeaderComp/Header";
import NewAlbumsForm from "../components/FormComp/NewAlbumsComps/NewAlbumsForm";
import AlbumPreview from "../components/FormComp/NewAlbumsComps/AlbumPreview";
import ArtistComp from "../components/FormComp/ArtistComps/ArtistComp";
import ArtistPreview from "../components/FormComp/ArtistComps/ArtistPreview"; 
import SinglesForm from "../components/FormComp/SingleComp/SinglesForm";
import SinglesPreview from "../components/FormComp/SingleComp/SinglesPreview";
import "./Admin.css";
import "../App.css";

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
  const[singleForm, setSingleForm] = useState({
    singleName: "",
    artistName: "",
    singleThumbnail: "",
    artistLabel: "",
    singleReview: "",
    genres: "",
    score: "",
    reviewSnippet: "",
    author: "",
    singleReleaseDate: "",
  });

  const renderForm = () => {
    switch (activeSection) {
      case "New Review":
        return <NewAlbumsForm formData={albumForm} setFormData={setAlbumForm}/>;
      case "Single":
        return <SinglesForm formData={singleForm} setFormData={setSingleForm}/>;
      case "Artist":
        return <ArtistComp formData={artistForm} setFormData={setArtistForm}/>;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    switch (activeSection) {
      case "New Review":
        return <AlbumPreview albumForm={albumForm} activeSection={activeSection} />;
      case "Single":
        return <SinglesPreview singleForm={singleForm} activeSection={activeSection} />;
      case "Artist":
        return <ArtistPreview artistForm={artistForm} activeSection={activeSection} />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (activeSection === "Artist") {
      try {
        const response = await fetch('/api/upload-artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: artistForm.artistName,
            description: artistForm.descrition,
            thumbnail: artistForm.artistThumbnail
          })
        });
        
        const result = await response.json();
        if (response.ok) {
          alert('Artist created successfully!');
        } else {
          alert(result.message || 'Error creating artist');
        }
      } catch (error) {
        alert('Error submitting form');
      }
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
              {["New Review", "Single", "Artist", "Logout"].map((item) => (
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
              <button type="button" onClick={handleSubmit}>Submit</button>
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