import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"

export const ErrorPage: React.FC = () => {
    return (
    <NavLink to="/"><Button>not the right page, press on me to be rederected</Button></NavLink>
    )
}