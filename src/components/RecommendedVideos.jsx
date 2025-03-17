import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL } from "../api/youtubeAPI";

const RecommendedVideos = ({ videoId, videoTitle }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoId || !videoTitle) return;

    const fetchRecommendedVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/search`, {
          params: {
            part: "snippet",
            q: videoTitle,
            type: "video",
            maxResults: 10,
            key: API_KEY,
          },
        });

        setRecommendedVideos(response.data.items || []);
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchRecommendedVideos();
  }, [videoId, videoTitle]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
        Recommended Videos
      </Typography>

      {recommendedVideos.length > 0 ? (
        recommendedVideos.map((video) => {
          const videoId = video.id.videoId || video.id;
          return (
            <Box
              key={videoId}
              onClick={() => navigate(`/watch/${videoId}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                cursor: "pointer",
                padding: "8px",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "160px", height: "90px", borderRadius: "8px" }}
              />

              <Box sx={{ flex: 1 }}>
               
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    color: "#000", 
                    fontSize: "14px",
                    lineHeight: "1.3",
                  }}
                >
                  {video.snippet.title}
                </Typography>

                
                <Typography variant="body2" color="gray">
                  {video.snippet.channelTitle}
                </Typography>

              </Box>
            </Box>
          );
        })
      ) : (
        <Typography color="gray">No recommended videos found.</Typography>
      )}
    </Box>
  );
};

export default RecommendedVideos;












