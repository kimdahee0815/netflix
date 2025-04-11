import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      {isSmallScreen ? (
        <footer style={{ marginBottom: "30px" }}></footer>
      ) : (
        <footer>
          <ul
            style={{
              display: "flex",
              color: "#858080",
              listStyle: "none",
              justifyContent: "center",
              fontSize: "13px",
              marginTop: "50px",
              position: "relative",
            }}
          >
            <li style={{ margin: "0 1.5rem" }}>2조</li>
            <li style={{ margin: "0 1.5rem" }}>김다희</li>

            <li style={{ margin: "0 1.5rem" }}>김지훈</li>

            <li style={{ margin: "0 1.5rem" }}>이길주</li>
            <li style={{ margin: "0 1.5rem" }}>전유승</li>
            {showButton && (
              <button
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "3rem",
                  backgroundColor: "#e6e6e6",
                  color: "#333",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                Top
              </button>
            )}
          </ul>
        </footer>
      )}
    </div>
  );
};

export default Footer;
