import { Box, Button } from "@mui/material";
import tankBG from "../assets/tank.png";
import logo from "../assets/zevet100.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TankContext } from "../store/tank-info-context";
import { Buttons } from "../assets/constants";
import { theme } from "../themes/themePalatte";

export const SideBar: React.FC = () => {
  const { userData, handleLogOut, handleLogin } = useContext(TankContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    handleLogin(false, "", "0", "");
    await handleLogOut();
    navigate("/");
  };

  return (
    <Box style={{ position: "relative", height: "100%", overflow: "hidden"}} sx={{backgroundColor: theme.palette.paperBG.main}}>
      <img className="tankBGSideBar" src={tankBG} alt="background" />
      <img className="zevet100" src={logo} alt="zevetLogo" />
      <Box style={{ display: "flex", flexDirection: "column", margin: "1rem"}} >
        <NavLink to="/main">
          {({ isActive }) => (
            <Button
              size="large"
              color={isActive ? "secondary" : "paperBG"}
              variant="contained"
              fullWidth
              sx={{ mt: "10rem" }}
            >
              {Buttons.MAINPAGE}{" "}
            </Button>
          )}
        </NavLink>
        {userData.isManager && (
          <NavLink to="/addtank">
            {({ isActive }) => (
              <Button
                size="large"
                color={isActive ? "secondary" : "paperBG"}
                fullWidth
                variant="contained"
                sx={{ mt: "1rem" }}
              >
                {Buttons.ADD_CAR}
              </Button>
            )}
          </NavLink>
        )}
      </Box>
      <NavLink
        style={{
          position: "absolute",
          bottom: "5%",
          width: "50%",
          right: "22%",
          zIndex: "1",
        }}
        to="/"
      >
        <Button
          onClick={handleLogout}
          size="large"
          color="logoutB"
          variant="contained"
          fullWidth
        >
          {Buttons.LOGOUT}
        </Button>
      </NavLink>
    </Box>
  );
};
