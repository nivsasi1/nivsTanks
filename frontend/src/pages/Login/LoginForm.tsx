import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import tankBG from "../../assets/tank.png";
import logo from "../../assets/zevet100.jpg";
import { TankContext } from "../../store/tank-info-context";
import { loginTry } from "../../store/functions.ts";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Alerts, Buttons, Errors, Titles } from "../../assets/constants";
import { theme } from "../../themes/themePalatte";

type Input = {
  pernr: number;
};

export const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleLogin, userData } = useContext(TankContext);
  const color = theme.palette.mainBG.main;
  const paperColor = theme.palette.paperBG.main;
  const typhography = theme.palette.mainBG.contrastText;
  
  //Navigating a signedin user to main page automatically
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.isLogged) {
      return navigate("/main");
    }
  }, [userData]);

  const { register, handleSubmit, formState } = useForm<Input>();
  const { errors } = formState;
  const onSubmit: SubmitHandler<Input> = async (data) => {
    setOpen(false);
    const data1 = { username: data.pernr, password: "111111" };
    const returnData = await loginTry(data1);
    if (returnData.message == "success") {
      //Exist pernr, log in
      handleLogin(
        true,
        returnData.gdud,
        returnData.isManager,
        returnData.pernr
      );
      navigate("/main");
    } else if (returnData.message == "fail") {
      //not a exist pernr, throw err
      setOpen(true);
    } else {
      //problem with the code
      console.log("problem fetching data...");
    }
  };

  //as of now only check for pernr are if its a number, between 6-9 chars
  return (
    <Box sx={{backgroundColor:color, width:"1"}}>
      <img className="tankBG" src={tankBG} alt="background" />
      <img className="zevet100" src={logo} alt="zevetLogo" />
      <Box className="login" sx={{backgroundColor:color}}>
        <Typography variant="h2" mb="2rem" color={typhography}>
          {Titles.MAIN_TITLE}
        </Typography>
        <Paper
        
          elevation={3}
          square={false}
          style={{ backgroundColor: paperColor, padding: "7.5rem 12rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("pernr", {
                required: { value: true, message: Errors.EMPTY_PERNR },
                minLength: { value: 6, message: Errors.PERNR_TOOSHORT },
                maxLength: {
                  value: 9,
                  message: Errors.PERNR_TOOLONG,
                },
                pattern: /^[0-9]{6,9}$/,
              })}
              id="pernr"
              name="pernr"
              label={Titles.ENTER_PERNR}
              fullWidth
              type="number"
              color="secondary"
              focused
              error={
                errors.pernr?.message != null &&
                errors.pernr?.message.length > 0
              }
              helperText={errors.pernr?.message}
            />
            <Collapse in={open}>
              <Alert
                severity="error"
                sx={{ marginTop: "1rem", marginBottom: "3rem" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {Alerts.NOT_EXIST}
              </Alert>
            </Collapse>
            <Button
              size="large"
              color="secondary"
              type="submit"
              variant="contained"
              sx={{ mt: "1rem" }}
            >
              {Buttons.LOGIN}
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
