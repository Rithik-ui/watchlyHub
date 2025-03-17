import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim()) {
        navigate(`/search/${query}`);
      }
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#181818", zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
           variant="h6"
          sx={{ color: "red", fontWeight: "bold", cursor: "pointer", flexGrow: 1 }}>
         <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              WatchlyHub
          </span>
       </Typography>


        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: "4px",
            padding: "5px 10px",
            width: "300px",
          }}
        >
          <SearchIcon onClick={handleSearch} style={{ cursor: "pointer" }} />
          <InputBase
            placeholder="Search..."
            sx={{ ml: 1, color: "white", width: "100%" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;






