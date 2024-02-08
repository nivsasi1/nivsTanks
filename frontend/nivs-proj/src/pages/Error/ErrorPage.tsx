import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  return (
    <NavLink to="/">
      <Button>Page Not Found, Press on me to be rederected</Button>
    </NavLink>
  );
};
