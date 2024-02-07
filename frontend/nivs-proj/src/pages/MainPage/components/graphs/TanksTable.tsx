import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { TankContext } from "../../../../store/tank-info-context";
import { tank } from "../../types/chartData";
import { styled } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TanksTable: React.FC<{ filter: string }> = ({ filter }) => {
  const { tankData } = useContext(TankContext);

  return (
    //<Paper className="scrollbar" sx={{width:'100%', overflow:'hidden' }}>
    <TableContainer className="scrollbar" sx={{ height: 440 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">כשירות</StyledTableCell>
            <StyledTableCell align="right">שם הרכב</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tankData.Tanks.filter(
            (tank) =>
              (filter && tank.carNumber && tank.carNumber.includes(filter)) ||
              filter == ""
          ).map((tank: tank) => (
            <StyledTableRow
              key={Number(tank.carNumber)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {tank.kshirot == true ? 1 : 0}
              </StyledTableCell>
              <StyledTableCell align="right">{tank.carNumber}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    //</Paper>
  );
};
