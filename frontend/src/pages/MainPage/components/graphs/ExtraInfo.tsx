import { Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { TankContext } from "../../../../store/tank-info-context";
import { theme } from "../../../../themes/themePalatte";
import { Labels } from "../../../../assets/constants";

export const ExtraInfo: React.FC<{ which: boolean }> = ({ which }) => {
  const { tankData } = useContext(TankContext);
  const color = String(theme.palette.paperBG.main); 
  const color2 = String(theme.palette.secondary.main); 

  const returninfo: string = which
    ? tankData.doughnutChartInfo + Labels.PRECENT_KSHIR
    : tankData.countKshir + Labels.KELIM_KSHERIM;

  return (
    <Paper
      elevation={2}
      style={{
        borderRadius: "2rem",
        flex: 0.2,
        display: "flex",
        flexDirection: "column",
      }}
      sx={{backgroundColor: color}}
    >
      <Paper
        elevation={2}
        sx={{
          margin: "auto",
          padding: "5rem",
          borderRadius: "2rem",
          backgroundColor: color2,
        }}
      >
        <Typography
          sx={{
            direction: "rtl",
            margin: "auto",
            color: theme.palette.mainBG.contrastText,
          }}
          variant="h4"
        >
          {returninfo}
        </Typography>
      </Paper>
    </Paper>
  );
};
