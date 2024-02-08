import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { TankContext, addTank } from "../../store/tank-info-context";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Errors, Titles, Alerts, Buttons } from "../../assets/constants";

type Input = {
  carNumber: number;
  makat: number;
  gdud: number;
};
let error = "";

export const AddTank: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<Input>();
  const { userData, setMainPage } = useContext(TankContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState({ error: false, success: false });

  //navigate to mainpage is user isnt manager, navigate to login page if isnt loggedin
  useEffect(() => {
    if (!userData.isManager) {
      return navigate("/main");
    }
    if (!userData.isLogged) {
      return navigate("/");
    }
    setMainPage(false);
  }, [userData]);

  const { errors } = formState;
  const onSubmit: SubmitHandler<Input> = async (data, e) => {
    let kshirot;

    if (alignment === "kshir") {
      kshirot = 1;
    } else if (alignment === "notkshir") {
      kshirot = 0;
    } else {
      //kshir was unseletcted and its a required data, pop error
      error = Alerts.KSHIR_ERROR;
      setOpen({ error: true, success: false });
      return;
    }
    const dataToSend = { ...data, kshirot: kshirot };
    console.log(dataToSend);
    const worked = await addTank(dataToSend);
    //register.reset();
    if (worked.message === "failed") {
      error = Alerts.ALREADY_EXIST;
      setOpen({ error: true, success: false });
      return;
    }
    setOpen({ error: false, success: true });

    e?.target.reset();
    //clear every input field for another enterin of fields and pop a success dialog, added
  };

  //as of now checking if its a number, between 6-9 chars
  const [alignment, setAlignment] = useState("kshir");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Box className="addtank">
        <Typography variant="h2" mb="2rem">
          {Titles.ADD_KLI}
        </Typography>
        <Paper
          sx={{ width: 1 / 2, mr: "auto", ml: "auto" }}
          elevation={3}
          style={{
            backgroundColor: "#F0F3FFa0",
            borderRadius: "1rem",
            padding: "7.5rem 12rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" style={{ textAlign: "right" }}>
              {Titles.INFO}
            </Typography>
            <TextField
              {...register("carNumber", {
                required: { value: true, message: Errors.EMPTY_CARNUM },
              })}
              id="carNumber"
              name="carNumber"
              label={Titles.CAR_NUMBER}
              fullWidth
              type="number"
              color="secondary"
              focused
              error={errors.carNumber?.message === Errors.EMPTY_CARNUM}
              helperText={errors.carNumber?.message}
            />
            <Stack direction="row" spacing={2} my={2}>
              <TextField
                {...register("makat", {
                  required: { value: true, message: Errors.EMPTY_MAKAT },
                })}
                id="makat"
                name="makat"
                label={Titles.MAKAT}
                type="number"
                color="secondary"
                sx={{ width: 1 / 2 }}
                focused
                error={errors.makat?.message === Errors.EMPTY_MAKAT}
                helperText={errors.makat?.message}
              />
              <TextField
                {...register("gdud", {
                  required: { value: true, message: Errors.EMPTY_GDUD },
                })}
                id="gdud"
                name="gdud"
                label={Titles.GDUD_NUM}
                sx={{ width: 1 / 2 }}
                type="number"
                color="secondary"
                focused
                error={
                  errors.gdud?.message != null &&
                  errors.gdud?.message.length > 0
                }
                helperText={errors.gdud?.message}
              />
            </Stack>
            <Typography variant="h6" style={{ textAlign: "right" }}>
              {Titles.CAR_KSHIROT}
            </Typography>

            <Stack direction="column" spacing={2}>
              <ToggleButtonGroup
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                sx={{ ml: "auto", mr: "0" }}
                style={{ alignSelf: "end" }}
              >
                <ToggleButton value="notkshir">{Titles.NOT_KSHIR}</ToggleButton>
                <ToggleButton value="kshir">{Titles.KSHIR}</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Collapse in={open.error}>
              <Alert
                dir="ltr"
                severity="error"
                sx={{ marginTop: "1rem", marginBottom: "3rem" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen({ error: false, success: false });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>

            <Button
              size="large"
              color="secondary"
              type="submit"
              variant="contained"
              sx={{ mt: "1rem" }}
            >
              {Buttons.ADD}
            </Button>

            <Collapse in={open.success}>
              <Alert
                dir="ltr"
                severity="success"
                sx={{ marginTop: "3rem", marginBottom: "1rem" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen({ error: false, success: false });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {Alerts.ADDED_SUCCSESFULY}
              </Alert>
            </Collapse>
          </form>
        </Paper>
      </Box>
    </>
  );
};
