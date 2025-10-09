"use client"; 

import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { useRouter } from "next/navigation";
import "./Header.css";
import Link from "next/link";
import { BoomBox, SunDim, Search, User, House, SunMoon, Menu, X } from "lucide-react";

function Header() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return nameParts.slice(0, 2).map(n => n[0]).join('').toUpperCase();
  };

  const getFirstName = (name) => {
    if (!name) return "";
    return name.split(" ")[0];
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    router.push('/login');
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <h1 className="header-logo">SHECKLIST</h1>

      <button
        className="hamburger"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      <nav className={`header-nav ${mobileNavOpen ? "show-mobile-nav" : ""}`}>
        
        <div className="icon-container">
          <Link href="/" className="header-link">
            <House size={20} />
          </Link>
          <span className="icon-label">Home</span>
        </div>

        <div className="icon-container">
          <Link href="/search" className="header-link">
            <Search size={20} />
          </Link>
          <span className="icon-label">Search</span>
        </div>

        <div className="icon-container">
          <Link href="/review-page" className="header-link">
            <BoomBox size={20} />
          </Link>
          <span className="icon-label">Reviews</span>
        </div>

        <div className="icon-container user-menu">
          {user ? (
            <>
            <div className="header-link">
              <button onClick={toggleDropdown} className="user-initials">
                {getInitials(user.username)}
              </button>
            </div>
              {showDropdown && (
                <div className="user-dropdown">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login" className="header-link">
              <User size={20} />
            </Link>
          )}
          <span className="icon-label">{user ? getFirstName(user.username) : 'Login'}</span>
        </div>

        <div className="icon-container" onClick={() => setDarkMode(!darkMode)}>
          <Link href="#" className="header-link">
            {darkMode ? <SunDim size={20} /> : <SunMoon size={20} />}
          </Link>
          <span className="icon-label">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>

      </nav>

    </header>
  );
}

export default Header;