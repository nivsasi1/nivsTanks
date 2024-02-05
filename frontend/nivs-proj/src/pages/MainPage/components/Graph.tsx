import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type graph = {
  setFilter: (e: string) => void;
  table?: boolean;
  flex?: number;
  title: string;
  children: React.ReactNode;
};

export const Graph: React.FC<graph> = ({
  setFilter,
  table,
  flex,
  title,
  children,
}) => {
  return (
    <Paper
      elevation={2}
      style={{
        borderRadius: "2rem",
        flex: flex ?? 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {table && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1.5rem 1.5rem",
          }}
        >
          <TextField
            onChange={(e) => setFilter(e.target.value)}
            label="חפש לפי מקט"
            type="number"
            style={{ borderRadius: "10rem" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          >
            חפש לפי מקט
          </TextField>

          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      {!table && (
        <Typography
          variant="h6"
          mr="2rem"
          mt="2rem"
          style={{ alignSelf: "end" }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};
