import React, { useState, useEffect } from "react";
import Sidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
import Navbar from "../components/landing/Navbar";
import BottomNavigationBar from "../components/Mobile/BottomNavigationBar";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Detect mobile screen
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main layout with sidebars */}
      <div
        style={{
          display: "flex",
          position: "relative",
          height: "calc(100vh - 64px)",
          marginTop: "1px",
          overflow: "hidden",
        }}
      >
        {/* Left Sidebar (visible on larger screens) */}
        {!isMobile && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "calc(100vh - 64px)",
              width: "300px",
              zIndex: 10,
              backgroundColor: "#f4f4f4",
              borderRight: "1px solid #ddd",
            }}
          >
            <Sidebar />
          </div>
        )}

        {/* Right Sidebar (visible on larger screens) */}
        {!isMobile && (
          <div
            style={{
              position: "fixed",
              right: 0,
              marginTop: "-4rem",
              height: "calc(100vh - 0px)",
              width: "400px",
              zIndex: 10,
              backgroundColor: "#f9f9f9",
              borderLeft: "1px solid #ddd",
            }}
          >
            <RightSidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            marginLeft: isMobile ? "0" : "230px",
            marginRight: isMobile ? "0" : "350px",
            overflowY: "auto",
            backgroundColor: "#fff",
            padding: "1rem",
            transition: "margin 0.3s ease-in-out",
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom navbar appears only in mobile views */}
      {isMobile && <BottomNavigationBar />}
    </div>
  );
};

export default Layout;
