import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import tankBG from "../../assets/tank.png";
import logo from "../../assets/zevet100.jpg";
import { useNavigate } from "react-router-dom";
//type handler = () => void;

type Input = {
  pernr: number;
};

export const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<Input>();
    const { errors } = formState;  const onSubmit: SubmitHandler<Input> = (data) =>
    {
        //fetch if user/admin, if yes nav, else error not existing
        navigate('/main')
        console.log(JSON.stringify(data));
    }
  //as of now checking if its a number, between 6-9 chars

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
                maxLength: { value: 9, message: "מספר אישי הוא לא יותר מ9 ספרות" },
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
