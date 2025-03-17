import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  if (!video.id) return null; 

  const handleClick = () => {
    const videoId = video.id.videoId || video.id;
    navigate(`/watch/${videoId}`);
  };

 
  const formatViews = (num) => {
    if (!num) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  
  const getTimeAgo = (dateString) => {
    const currentDate = new Date();
    const videoDate = new Date(dateString);
    const timeDiff = Math.floor((currentDate - videoDate) / 1000); 

    const minutes = Math.floor(timeDiff / 60);
    const hours = Math.floor(timeDiff / 3600);
    const days = Math.floor(timeDiff / 86400);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <Card sx={{ width: 300, cursor: "pointer", boxShadow: 3 }} onClick={handleClick}>
      <CardMedia
        component="img"
        height="180"
        image={video.snippet?.thumbnails?.high?.url || "/default-thumbnail.jpg"}
        alt={video.snippet?.title || "No title available"}
      />
      <CardContent>

        <Typography variant="h6" noWrap>
          {video.snippet?.title || "No title available"}
        </Typography>

        <Typography variant="subtitle2" color="gray">
          {video.snippet?.channelTitle || "Unknown Channel"}
        </Typography>
      
        {video.statistics?.viewCount && video.snippet?.publishedAt && (
          <Typography variant="body2" color="textSecondary">
            {formatViews(parseInt(video.statistics.viewCount))} views • {getTimeAgo(video.snippet.publishedAt)}
          </Typography>
          
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;








