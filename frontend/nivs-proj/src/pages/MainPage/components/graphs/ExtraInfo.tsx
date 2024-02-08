import { Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { TankContext } from "../../../../store/tank-info-context";
import { theme } from "../../../../themes/themePalatte";
import { Labels } from "../../../../assets/constants";

export const ExtraInfo: React.FC<{ which: boolean }> = ({ which }) => {
  const { tankData } = useContext(TankContext);

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
    >
      <Paper
        elevation={2}
        sx={{
          margin: "auto",
          padding: "5rem",
          borderRadius: "2rem",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography
          sx={{
            direction: "rtl",
            margin: "auto",
            color: theme.palette.secondary.contrastText,
          }}
          variant="h4"
        >
          {returninfo}
        </Typography>
      </Paper>
    </Paper>
  );
};
