import { Paper, Typography } from "@mui/material";

type graph = {
  flex?: number;
  title: string;
  children: React.ReactNode;
};

export const Graph: React.FC<graph> = ({ flex, title, children }) => {
  return (
    <Paper
      elevation={2}
      style={{
        borderRadius: "2rem",
        flex: flex ?? 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" mr="2rem" mt="2rem" style={{ alignSelf: "end" }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
