import React, { useEffect, useState } from "react";
import { fetchMostPopularVideos } from "../api/youtubeAPI";
import VideoCard from "./VideoCard";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchMostPopularVideos();
      setVideos(data);
      setLoading(false);
    };
    getVideos();
  }, []);

  return (
    <Box sx={{p: 3, mt: 8 }}>  
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress size={50} />
        </Box>
      ) : videos.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No videos available. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Feed;




