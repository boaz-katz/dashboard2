import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Projectcode from "./projectcode";

function Budgettable(props) {
  const [datacardindex, setcardindex] = useState([]);

  useEffect(() => {
    filterdata(props.data);
  }, [props.data]);

  ////  maiking arry of projects

  const filterdata = (arry) => {
    let arryofprojects = [];
    if (arry) {
      const projects = arry.map((newob) => newob.project);
      const uniqueArray = projects.filter((item, pos) => {
        return projects.indexOf(item) == pos;
      });

      for (let i = 0; i < uniqueArray.length; i++) {
        const projectsunion = arry.filter(
          (item) => item.project === uniqueArray[i]
        );
        arryofprojects.push({ projectsunion });
      }
      // return arryofprojects;
      setcardindex(arryofprojects);
    }
  };

  function createData(project, code, cardindexi) {
    return {
      project,
      code,

      cardindexi: cardindexi,
    };
  }

  const rows = [];
  // console.log(datacardindex[0]?.projectsunion);
  const roes1 = () => {
    if (datacardindex) {
      for (let i = 0; i < datacardindex.length; i++) {
        rows.push(
          createData(
            datacardindex[i]?.projectsunion[0].project,
            datacardindex[i]?.projectsunion[0].code,
            datacardindex[i]?.projectsunion
          )
        );
      }
    }
  };

  roes1();
  const useRowStyles = makeStyles({
    root: {
      width: "100%",
      "& > *": {
        borderBottom: "unset",
      },
    },
    container: {
      maxHeight: 440,
    },
  });

  function Row(props) {
    const classes = useRowStyles();

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // conter of badjet
    const contingdebt = row.cardindexi.map((debt) => debt.debt);
    let conter = 0;

    for (let i = 0; i < contingdebt.length; i++) {
      if (parseInt(contingdebt[i])) {
        conter += parseInt(contingdebt[i]);
      }
    }

    const contingreciev = row.cardindexi.map((reciev) => reciev.reciev);
    let conterreciev = 0;

    for (let i = 0; i < contingreciev.length; i++) {
      if (parseInt(contingreciev[i])) {
        conterreciev += parseInt(contingreciev[i]);
      }
    }

    const [numbercolers, setnumbercolers] = useState(false);

    useEffect(() => {
      if (conterreciev - conter >= 0) {
        setnumbercolers("numbercolersgreen");
      } else {
        setnumbercolers("numbercolersgred");
      }
    }, []);

    let corentdebtbudget = 0;
    let corentrecievbudget = 0;
    const corebtbudget = () => {
      for (let i = 0; i < row.cardindexi.length; i++) {
        if (row.cardindexi[i].debt) {
          corentdebtbudget = row.cardindexi[i].budget;
        } else if (row.cardindexi[i].reciev) {
          corentrecievbudget = row.cardindexi[i].budget;
        }
      }
    };
    corebtbudget();

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align=" center" component="th" scope="row">
            {row.project}
          </TableCell>

          <TableCell align=" center">{corentrecievbudget}</TableCell>
          <TableCell align=" center">{corentdebtbudget}</TableCell>
          <TableCell align=" center" className={numbercolers}>
            {conterreciev - conter}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Projectcode data={row.cardindexi} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <div dir="rtl">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align=" center">פרויקט</TableCell>

              <TableCell align=" center"> תקציב הכנסות </TableCell>
              <TableCell align=" center"> תקציב הוצאות </TableCell>
              <TableCell align=" center">
                ביצוע בפועל &nbsp;(יתרה/גרעון){" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.project} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

export default Budgettable;
