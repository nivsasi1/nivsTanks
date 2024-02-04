import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import tankBG from "../../assets/tank.png";
import logo from "../../assets/zevet100.jpg";
import { useNavigate } from "react-router-dom";
//type handler = () => void;
import { updateLogin } from "../../http.ts"

type Input = {
  pernr: number;
};

export const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<Input>();
    const { errors } = formState;  const onSubmit: SubmitHandler<Input> = async (data) =>
    {
        //fetch if user/admin, if yes nav, else error not existing
        console.log(JSON.stringify(data));

       // await updateLogin(JSON.stringify(data))
        const data1 = { "username" : "8604191", "pass" : "lmao"}
        const response = await fetch('http://localhost:5173/login', {method:'POST', body: JSON.stringify(data1), headers:{'Content-Type': 'application/json'}})
        const resData = await response.json();
        if(!response.ok){
            throw new Error('התחברות נכשלה, בעיה במערכת')
        }
        console.log( resData.message);
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
