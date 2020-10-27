import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

function Karteset(props) {
  console.log(props.data);
  return (
    <div>
      <Box margin={1}>
        <div dir="rtl">
          <Typography variant="h6" gutterBottom component="div">
            כרטסת
          </Typography>
        </div>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>תאריך</TableCell>
              <TableCell>ספק/לקוח</TableCell>
              <TableCell>הערות</TableCell>
              <TableCell>חובות/תשלומים</TableCell>
              <TableCell>הכנסות /התחייבויות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((cardindexiRow) => (
              <TableRow key={cardindexiRow.date}>
                <TableCell component="th" scope="row">
                  {cardindexiRow.date}
                </TableCell>
                <TableCell>{cardindexiRow.name}</TableCell>
                <TableCell component="th" scope="row">
                  {cardindexiRow.index}
                </TableCell>

                <TableCell align="center">{cardindexiRow.debt}</TableCell>
                <TableCell align="center">{cardindexiRow.reciev}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>{" "}
    </div>
  );
}
export default Karteset;
