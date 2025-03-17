import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; 
const BASE_URL = import.meta.env.VITE_YOUTUBE_API_URL; 

export { API_KEY, BASE_URL };


const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const fetchMostPopularVideos = async () => {
  try {
    const response = await api.get("/videos", {
      params: {
        part: "snippet,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error(" Error fetching videos:", error.response?.data || error.message);
    return [];
  }
};

