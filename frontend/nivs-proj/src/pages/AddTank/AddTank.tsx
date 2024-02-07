import {
  Box,
  Button,
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

type Input = {
  carNumber: number;
  makat: number;
  gdud: number;
};

export const AddTank: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<Input>();
  const { userData } = useContext(TankContext);
  const navigate = useNavigate();

  //navigate to mainpage is user isnt manager, navigate to login page if isnt loggedin
  useEffect(() => {
    if (!userData.isManager) {
      return navigate("/main");
    }
    if (!userData.isLogged) {
      return navigate("/");
    }
  }, [userData]);

  const { errors } = formState;
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const i = alignment;
    let kshirot;
    if (i === "kshir") {
      kshirot = 1;
    } else if (i === "notkshir") {
      kshirot = 0;
    } else {
      //kshir was unseletcted and its a required data, pop error
      return;
    }
    const dataToSend = { ...data, kshirot: kshirot };
    console.log(dataToSend);
    console.log(await addTank(dataToSend));
    //register.reset();

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
          הוספת כלי
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
              פרטים
            </Typography>
            <TextField
              {...register("carNumber", {
                required: { value: true, message: "נא הכנס מספר רכב" },
              })}
              id="carNumber"
              name="carNumber"
              label="מספר רכב (צ׳)"
              fullWidth
              type="number"
              color="secondary"
              focused
              error={errors.carNumber?.message === "נא הכנס מספר רכב"}
              helperText={errors.carNumber?.message}
            />

            <Stack direction="row" spacing={2} my={2}>
              <TextField
                {...register("makat", {
                  required: { value: true, message: "נא הכנס מקט" },
                })}
                id="makat"
                name="makat"
                label="מקט"
                type="number"
                color="secondary"
                sx={{ width: 1 / 2 }}
                focused
                error={errors.makat?.message === "נא הכנס מקט"}
                helperText={errors.makat?.message}
              />
              <TextField
                {...register("gdud", {
                  required: { value: true, message: "נא הכנס מספר גדוד" },
                })}
                id="gdud"
                name="gdud"
                label="מספר גדוד"
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
              כשירות רכב
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
                <ToggleButton value="notkshir">לא כשיר</ToggleButton>
                <ToggleButton value="kshir">כשיר</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Button
              size="large"
              color="secondary"
              type="submit"
              variant="contained"
              sx={{ mt: "1rem" }}
            >
              הוספה
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};
