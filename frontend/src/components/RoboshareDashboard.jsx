import React from "react";
import RoboshareNavbar from "../components/RoboshareNavbar";
import Footer from "../components/Footer";

export default function RoboshareDashboard() {
  return (
    <div>
      <RoboshareNavbar />
      <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1>Coming Soon</h1>
      </div>
      <Footer />
    </div>
  );
}
