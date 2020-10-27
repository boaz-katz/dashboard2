import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Deposits(props) {
  const [datacardindex, setcardindex] = useState([]);
  useEffect(() => {
    setcardindex(props.data);
  }, [props.data]);

  let imcomebudget = 0;
  let expebsesebudget = 0;
  let alldebt = 0;
  let allreciev = 0;

  if (datacardindex) {
    for (let i = 0; i < datacardindex.length; i++) {
      if (datacardindex[i].debt) {
        alldebt += datacardindex[i].debt;
        expebsesebudget += datacardindex[i].budget;
      } else {
        allreciev += datacardindex[i].reciev;
        imcomebudget += datacardindex[i].budget;
      }
    }
  }

  const classes = useStyles();

  return (
    <div>
      {" "}
      <TableContainer component={Paper}>
        <Table
          dir="rtl"
          id="exporttotal"
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">תקציב </TableCell>
              <TableCell align="right">ביצוע </TableCell>
              <TableCell align="right">יתרה/גרעון </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">{"הכנסות"}</TableCell>
              <TableCell align="right">{imcomebudget}</TableCell>
              <TableCell align="right">{allreciev}</TableCell>
              <TableCell align="right">{imcomebudget - allreciev}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right">{"הוצאות"}</TableCell>
              <TableCell align="right">{expebsesebudget}</TableCell>
              <TableCell align="right">{alldebt}</TableCell>
              <TableCell align="right">{expebsesebudget - alldebt}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right">{"סהכ"}</TableCell>
              <TableCell align="right">
                {imcomebudget - expebsesebudget}
              </TableCell>
              <TableCell align="right">{allreciev - alldebt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
