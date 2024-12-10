import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import Post from "./Post";

const MainFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "1rem" }}>
      {posts.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No posts available, try creating one :)
        </Typography>
      ) : (
        <Box>
          {posts.map((post) => (
            <Post key={post._id} post={post} fetchPosts={fetchPosts} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MainFeed;
