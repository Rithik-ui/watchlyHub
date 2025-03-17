import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import { useParams} from "react-router-dom";
import VideoCard from "../components/VideoCard"; 
import { API_KEY } from "../api/youtubeAPI";

const SearchResults = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video`
      );
      setVideos(response.data.items);
    };

    fetchVideos();
  }, [query]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {videos.map((video) => (
          <Grid item key={video.id.videoId} xs={12} sm={6} md={4} lg={3}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;

