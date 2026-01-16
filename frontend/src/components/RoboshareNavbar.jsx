import React from "react";
import "../styles/RoboshareNavbar.css";

export default function RoboshareNavbar({ userProfilePic }) {
  return (
    <nav className="roboshare-nav">
      <div className="logo">RoboShare</div>
      <ul className="nav-links"><li>Op1</li><li>Op2</li><li>Op3</li></ul>
      <div className="user-profile"><img src={userProfilePic || "default-avatar.png"} alt="User Logo" className="circular-logo" /></div>
    </nav>
  );
}
