import { Paper, Typography } from "@mui/material";
import { TableHeader } from "./TableHeader";

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
      sx={{
        borderRadius: "2rem",
        flex: flex ?? 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: 'paperBG.main',
      }}
    >
      {table ? (
        <TableHeader setFilter={setFilter} title={title} />
      ) : (
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
