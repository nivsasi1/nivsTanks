import {
  Alert,
  AlertTitle,
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
import { TankContext, loginTry } from "../../store/tank-info-context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

type Input = {
  pernr: number;
};

export const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleLogin, userData } = useContext(TankContext);

  //navigating a signedin user to main page automatically
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
      //exist pernr, log in
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
    <>
      <img className="tankBG" src={tankBG} alt="background" />
      <img className="zevet100" src={logo} alt="zevetLogo" />
      <div className="login">
        <Typography variant="h2" mb="2rem">
          מערכת מצב כשירות הכלים בצה"ל
        </Typography>
        <Paper
          elevation={3}
          square={false}
          style={{ backgroundColor: "#F0F3FFa0", padding: "7.5rem 12rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("pernr", {
                required: { value: true, message: "נא הכנס מספר אישי" },
                minLength: { value: 6, message: "מספר אישי הוא לפחות 6 ספרות" },
                maxLength: {
                  value: 9,
                  message: "מספר אישי הוא לא יותר מ9 ספרות",
                },
                pattern: /^[0-9]{6,9}$/,
              })}
              id="pernr"
              name="pernr"
              label="הכנס מספר אישי"
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
                  {" "}
                  שגיאה המשתמש לא קיים{" "}
                </Alert>
              </Collapse>
            <Button
              size="large"
              color="secondary"
              type="submit"
              variant="contained"
              sx={{ mt: "1rem" }}
            >
              התחבר
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};
