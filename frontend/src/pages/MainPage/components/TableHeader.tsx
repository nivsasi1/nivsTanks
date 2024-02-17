import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Labels } from "../../../assets/constants";

export const TableHeader: React.FC<{
  title: string;
  setFilter: (e: string) => void;
}> = ({ title, setFilter }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      m="1.5rem"
      alignItems="center"
    >
      <TextField
        onChange={(e) => setFilter(e.target.value)}
        label={Labels.SEARCH_BY_MAKAT}
        type="number"
        color="secondary"
        sx={{backgroundColor: "#F0F3FFa0"}}
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
    </Stack>
  );
};
