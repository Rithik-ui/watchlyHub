import { Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import VideoPage from "./pages/VideoPage";
import Feed from "./components/Feed"
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/watch/:videoId" element={<VideoPage />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;















