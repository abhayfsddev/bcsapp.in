import React, { useState } from "react";
import "../styles/Navigation.css";

export default function Navigation({
   currentPage,
   onPageChange,
   darkMode,
   onToggleDark,
}) {
   const [menuOpen, setMenuOpen] = useState(false);
   const handleDownloadCV = async () => {
      try {
         // Track the download
         const apiUrl =
            import.meta.env.VITE_API_URL || "https://mail.bcsapp.in";
         await fetch(`${apiUrl}/api/track-download`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
         });
      } catch (error) {
         console.error("Error tracking download:", error);
      }

      // Proceed with download
      const link = document.createElement("a");
      link.href = "/ABHAY_8Y_Resume.pdf";
      link.download = "ABHAY_8Y_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <nav className={`nav ${menuOpen ? "mobile-open" : ""}`}>
         <div className="logo">
            <img
               src="/logo.png"
               alt="FSMaster.in Logo"
               className="logo-image"
            />
         </div>
         <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
         >
            <span className="hamburger-box">
               <span className="hamburger-inner" />
            </span>
         </button>
         <div
            className={`nav-links ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(false)}
         >
            <button
               className={`nav-link ${currentPage === "home" ? "active" : ""}`}
               onClick={() => onPageChange("home")}
            >
               Home
            </button>
            <button
               className={`nav-link ${currentPage === "about" ? "active" : ""}`}
               onClick={() => onPageChange("about")}
            >
               About
            </button>
            <button
               className={`nav-link ${currentPage === "interview" ? "active" : ""}`}
               onClick={() => onPageChange("interview")}
            >
               Backend
            </button>
            <button
               className={`nav-link ${currentPage === "coding" ? "active" : ""}`}
               onClick={() => onPageChange("coding")}
            >
               Coding
            </button>
            <button
               className={`nav-link ${currentPage === "questions" ? "active" : ""}`}
               onClick={() => onPageChange("questions")}
            >
               UI
            </button>
            <button
               className={`nav-link ${currentPage === "plsql" ? "active" : ""}`}
               onClick={() => window.open("/plsql/index.html", "_blank")}
            >
               PL/SQL
            </button>
            <button
               className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
               onClick={() => onPageChange("contact")}
            >
               Contact
            </button>
         </div>
         <div className="nav-right">
            <button
               className="icon-btn"
               onClick={() => onPageChange("analytics")}
               title="Analytics Dashboard"
            >
               📊
            </button>
            <button
               className="icon-btn"
               onClick={handleDownloadCV}
               title="Download CV"
            >
               📥
            </button>
            <button
               className="icon-btn"
               onClick={onToggleDark}
               title="Toggle dark mode"
            >
               {darkMode ? "☀️" : "🌙"}
            </button>
         </div>
      </nav>
   );
}
