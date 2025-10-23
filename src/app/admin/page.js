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
import "../login/Login.css";
import "../App.css"

function Admin() {
  const [activeSection, setActiveSection] = useState("New Review");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();
  const [albumForm, setAlbumForm] = useState({
    albumName: "",
    artistName: "",
    albumThumbnail: "",
    artistLabel: "",
    albumReview: "",
    genres: [],
    score: "",
    reviewSnippet: "",
    author: "",
    albumReleaseDate: "",
  });
  const [artistForm, setArtistForm] = useState({
    artistName: "",
    artistThumbnail: "",
    descrition: "",
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
    setIsLoading(true);
    try {
      switch (activeSection) {
        case "Artist": {
          const response = await fetch("/api/upload-artist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: artistForm.artistName,
              description: artistForm.descrition,
              thumbnail: artistForm.artistThumbnail,
            }),
          });
          const result = await response.json();
          if (response.ok) {
            setAlertMessage("Artist created successfully!");
          } else {
            setAlertMessage(result.message || "Error creating artist");
          }
          setShowAlert(true);
          break;
        }
        case "New Review": {
          const response = await fetch("/api/upload-album", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: albumForm.albumName,
              artistName: albumForm.artistName,
              albumThumbnail: albumForm.albumThumbnail,
              artistLabel: albumForm.artistLabel,
              albumReview: albumForm.albumReview,
              genres: albumForm.genres,
              score: albumForm.score,
              reviewSnippet: albumForm.reviewSnippet,
              author: albumForm.author,
              albumReleaseDate: albumForm.albumReleaseDate,
            }),
          });
          const result = await response.json();
          if (response.ok) {
            setAlertMessage("Album created successfully!");
          } else {
            setAlertMessage(result.message || "Error creating album");
          }
          setShowAlert(true);
          break;
        }
        case "Single": {
          break;
        }
        default:
          break;
      }
    } catch (error) {
      setAlertMessage("Error submitting form");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <Header />
      
      {showAlert && (
        <div className="alert-container">
          <div className="alert-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="alert-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 
             0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{alertMessage}</span>
            <button
              onClick={() => setShowAlert(false)}
              className="alert-close"
            >
              ×
            </button>
          </div>
        </div>
      )}
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
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <button type="button" onClick={handleSubmit}>Submit</button>
              )}
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