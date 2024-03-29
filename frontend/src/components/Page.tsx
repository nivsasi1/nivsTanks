import { Box } from "@mui/material";
import { SideBar } from "./SideBar";

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundColor:'mainBG.main'
      }}
    >
      <Box
        sx={{
          flexGrow: "1",
          height: "100vh",
          ackgroundColor:'mainBG.main',
                    overflowY: "auto",
        }}
      >
        {children}
      </Box>
      {/* change to secondary color the bg so cleaner */}
      <Box sx={{ width: "15rem", height: "100vh", backgroundColor: "#899BF8" }}>
        <SideBar />
      </Box>
    </Box>
  );
};
