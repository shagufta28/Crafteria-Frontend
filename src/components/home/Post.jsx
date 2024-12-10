import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { FavoriteBorder, Favorite, Comment, Share } from "@mui/icons-material";
import axios from "axios";

const Post = ({ post, fetchPosts }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(localStorage.getItem("userId")));
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");
  const [showAddComment, setShowAddComment] = useState(false); // State for toggling Add Comment
  const [following, setFollowing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    followersCount: 0,
    followingCount: 0,
    profilePicture: '', // Placeholder for profile picture URL
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if the user is already following the post's user
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`https://crafteria.onrender.com/api/users/${post.user._id}/isFollowing`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        })
        .then((response) => {
          setFollowing(response.data.isFollowing);
        })
        .catch((err) => console.error("Error checking follow status:", err));
    }
  }, [post.user._id]);

  // Follow a user
  const followUser = async () => {
    try {
      const response = await axios.post('https://crafteria.onrender.com/api/users/follow', {
        userId: userData._id, // Assuming you have the user ID in state or context
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      // Update follower/following count in state
      if (response.data.success) {
        setUserData(prevState => ({
          ...prevState,
          followingCount: prevState.followingCount + 1,
        }));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  // Unfollow a user
  const unfollowUser = async () => {
    try {
      const response = await axios.post('https://crafteria.onrender.com/api/users/unfollow', {
        userId: userData._id, // Assuming you have the user ID in state or context
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      // Update follower/following count in state
      if (response.data.success) {
        setUserData(prevState => ({
          ...prevState,
          followingCount: prevState.followingCount - 1,
        }));
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleLike = async () => {
    try {
        const response = await axios.put(
            `https://crafteria.onrender.com/api/posts/${post._id}/like`,
            {}, // Empty body
            { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        );

        setLiked(response.data.liked); // Update liked state based on backend
        setLikes(response.data.likes); // Update likes count
    } catch (error) {
        console.error("Error liking post:", error);
    }
};
  

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `https://crafteria.onrender.com/api/posts/${post._id}/comment`,
        { comment: commentText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );

      setComments(response.data.comments); // Update comments with the populated response
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box
      sx={{
        width: isMobile ? "22.3rem" : "50rem", // Make post full width on mobile
        ml: isMobile ? -3 : 6, // Remove left margin for mobile view
        border: "1px solid #ddd",
        padding: "0rem",
        marginBottom: "1.5rem",
        backgroundColor: "#fff",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" , paddingLeft: "1rem", paddingTop: "1rem"}}>
        {/* <Box
          sx={{
            width: "40px",
            borderRadius:'50%',
            height: "40px",
            backgroundColor: "#ccc",
            overflow: "hidden",
            marginRight: "0.8rem",
          }}
        > */}
          {/* <img
            src={post.user.profilePicture || "/default-avatar.jpg"}
            alt="Profile"
            style={{ width: "100%", height: "100%" }}
          /> */}
        {/* </Box> */}
        <Typography sx={{ fontWeight: "bold" }}>{post.user.name}</Typography>
        {/* Follow/Unfollow Button
        {/* Follow/Unfollow Button */}
        {/* <Button
            variant="contained"
            color="primary"
            onClick={userData.followingCount === 0 ? followUser : unfollowUser}
            sx={{ marginTop: '10px' }}
          >
            {userData.followingCount === 0 ? 'Follow' : 'Unfollow'}
          </Button> */} 
      </Box>

      {/* Image */}
      {post.image && (
  <Box sx={{ overflow: "hidden" }}>
    <img
      src={`${post.image}`}
      alt="Post"
      style={{
        width: "100%", // Full width for mobile and desktop
              height: isMobile ? "60vh" : "auto", // Adjust image height on mobile
              objectFit: "cover",
      }}
    />
  </Box>
)}

      
      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" , paddingLeft: "1rem"}}>
  <IconButton onClick={handleLike}>
    {liked ? (
      <Favorite sx={{ color: "red", borderRadius: "50%" }} />
    ) : (
      <FavoriteBorder />
    )}
  </IconButton>
  {/* Show like count only if likes > 0 */}
  {likes > 0 && (
    <Typography sx={{ marginRight: "1.5rem" }}>{likes}</Typography>
  )}
  <IconButton onClick={() => setShowAddComment(!showAddComment)}>
    <Comment />
  </IconButton>
  {/* <IconButton>
    <Share />
  </IconButton> */}
</Box>

{/* Caption */}
<Typography sx={{ marginBottom: "0.8rem" , paddingLeft: "1rem",  fontSize: isMobile ? "0.9rem" : "1rem",}}><b>{post.user.name}</b> {post.caption}</Typography>


      {/* Comments */}
      <Box>
        <Typography sx={{paddingLeft: "1rem", color:'grey', fontSize:'0.8rem' }}>Comments</Typography>
        {comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.3rem",
              marginTop: "1rem",
              paddingLeft: "1rem"
            }}
          >
            {/* Profile Picture
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                overflow: "hidden",
                marginRight: "0.8rem",
              }}
            >
              <img
                src={comment.user.profilePicture || "/default-avatar.jpg"}
                alt="Profile"
                style={{ width: "100%", height: "100%" }}
              />
            </Box> */}

            {/* Name and Comment */}
            <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
              <strong>{comment.user.name}</strong>: {comment.comment}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Add Comment */}
      {showAddComment && (
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem", padding: "1rem" }}>
          <TextField
            variant="outlined"
            placeholder="Add a comment..."
            size="small"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{ flex: 1, marginRight: "0.5rem", fontSize: isMobile ? "0.75rem" : "inherit" }}
          />
          <Button variant="contained" onClick={handleComment} sx={{
              fontSize: isMobile ? "0.7rem" : "inherit",
            }}>
            Post
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Post;
