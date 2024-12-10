import React, { useState, useEffect } from "react";
import CommunityList from "../Chat/CommunityList";
import ChatWindow from "../Chat/ChatWindow";
import { CssBaseline } from "@mui/material";

const RightSidebar = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      {/* If no community is selected, show the sidebar. */}
      {!selectedCommunity ? (
        <CommunityList setSelectedCommunity={setSelectedCommunity} />
      ) : (
        <ChatWindow
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
          userToken={userToken}
        />
      )}
    </>
  );
};

export default RightSidebar;
