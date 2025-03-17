import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Avatar, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RecommendedVideos from "../components/RecommendedVideos";
import { API_KEY, BASE_URL } from "../api/youtubeAPI";

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoResponse = await axios.get(`${BASE_URL}/videos`, {
          params: { part: "snippet,statistics", id: videoId, key: API_KEY },
        });
        const video = videoResponse.data.items[0];

        const commentResponse = await axios.get(`${BASE_URL}/commentThreads`, {
          params: { part: "snippet", videoId, key: API_KEY, maxResults: 100 },
        });

        const channelResponse = await axios.get(`${BASE_URL}/channels`, {
          params: { part: "statistics", id: video.snippet.channelId, key: API_KEY },
        });

        setVideoData(video);
        setComments(commentResponse.data.items);
        setChannelData(channelResponse.data.items[0].statistics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  const formatNumber = (num) => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(num);

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: { xs: "column", md: "row" }, 
      gap: 3, 
      p: { xs: 1, md: 3 }, 
      pt: { xs: 3, md: 5 } 
    }}>
      
      {/* Video Player and Details */}
      <Box sx={{ flex: 2 }}>
        <iframe
          style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          {videoData?.snippet?.title}
        </Typography>

        {/* Channel Info */}
        <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
          <Avatar src={videoData?.snippet?.thumbnails?.high?.url} />
          <Box>
            <Typography variant="subtitle1">{videoData?.snippet?.channelTitle}</Typography>
            <Typography variant="body2" color="textSecondary">
              {formatNumber(channelData?.subscriberCount)} subscribers
            </Typography>
          </Box>
        </Box>

        {/* Stats (Views, Likes, Dislikes) */}
        <Box display="flex" alignItems="center" gap={3} sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VisibilityIcon fontSize="small" /> {formatNumber(videoData?.statistics?.viewCount)} views
          </Typography>
          <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />}>
            {formatNumber(videoData?.statistics?.likeCount)} Likes
          </Button>
          <Button variant="contained" color="secondary" startIcon={<ThumbDownIcon />}>
            {formatNumber(videoData?.statistics?.dislikeCount || 0)} Dislikes
          </Button>
        </Box>

        {/* Video Description */}
        <Typography variant="body1" sx={{ mt: 2, backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
          {showFullDescription ? videoData?.snippet?.description : `${videoData?.snippet?.description.slice(0, 300)}...`}
          <Button variant="text" onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? "Read Less" : "Read More"}
          </Button>
        </Typography>

        {/* Comments Section */}
        <Typography variant="h6" sx={{ mt: 3 }}>💬 Comments</Typography>
        <Box sx={{ mt: 1, maxHeight: "500px", overflowY: "auto", width: "100%", px: { xs: 1, md: 2 } }}>
          {comments.map((comment) => (
            <Box key={comment.id} sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {comment.snippet.topLevelComment.snippet.textDisplay}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
                <Button variant="text" startIcon={<ThumbUpIcon />}>
                  {formatNumber(comment.snippet.topLevelComment.snippet.likeCount)}
                </Button>
                <Button variant="text" startIcon={<ThumbDownIcon />}>
                  {formatNumber(comment.snippet.topLevelComment.snippet.dislikeCount || 0)}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Recommended Videos */}
      <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
        <RecommendedVideos videoId={videoId} videoTitle={videoData?.snippet?.title} />
      </Box>
    </Box>
  );
};

export default VideoPage;




















