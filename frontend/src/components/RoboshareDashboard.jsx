// RoboshareDashboard.js
import React from "react";
import RoboshareNavbar from "../components/RoboshareNavbar";
import Footer from "../components/Footer"; // Reusing your existing footer

const RoboshareDashboard = () => {
  return (
    <div>
      <RoboshareNavbar />
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Coming Soon</h1>
      </div>
      <Footer />
    </div>
  );
};

export default RoboshareDashboard;
