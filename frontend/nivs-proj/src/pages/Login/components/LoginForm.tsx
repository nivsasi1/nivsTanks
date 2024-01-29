import { Button, Paper, TextField, Typography } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import tankBG from "../../../assets/tank.png"
import logo from "../../../assets/zevet100.jpg"
//type handler = () => void;


type Input = {
    pernr: number
}

export const LoginForm: React.FC = () => {
    const { register, handleSubmit } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => console.log(JSON.stringify(data))
    //as of now checking if its a number, between 6-9 chars

    return (
        <>
            <img className="tankBG" src={tankBG} alt="background" />
            <img className="zevet100" src={logo} alt="zevetLogo" />
            <div className="login">
                <Typography  variant="h2" mb="2rem">מערכת מצב כשירות הכלים בצה"ל</Typography>
                <Paper 
                elevation={3} 
                square={false} 
                style={{backgroundColor:'#F0F3FFa0', padding: '7.5rem 12rem'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                        {...register("pernr", { required: true, minLength:6, maxLength:9, pattern:/^[0-9]{6,9}$/})} 
                        id="pernr"
                        name="pernr"
                        label="הכנס מספר אישי"
                        fullWidth
                        type="number"
                        color="secondary"
                        focused
                        />
                        <Button 
                        size="large"
                        color="secondary"
                        type="submit"
                        variant="contained"
                        sx={{mt:'1rem'}}
                        >
                        התחבר
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    )
}