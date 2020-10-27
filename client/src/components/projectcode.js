import React, { useEffect, useState } from "react";

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
import Karteset from "./karteset";
import Projactsection from "./projectsection";
function Projectcode(props) {
  const [datacardindex, setcardindex] = useState(false);

  useEffect(() => {
    setcardindex(filterdata(props.data));
  }, []);

  ////  maiking arry of projects

  const filterdata = (arry) => {
    let arryofprojects = [];
    const projects = arry.map((newob) => newob.code);
    const uniqueArray = projects.filter((item, pos) => {
      return projects.indexOf(item) == pos;
    });

    for (let i = 0; i < uniqueArray.length; i++) {
      const projectsunion = arry.filter((item) => item.code === uniqueArray[i]);

      arryofprojects.push({ projectsunion });
    }
    return arryofprojects;
  };

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  function createData(project, code, cardindexi) {
    return {
      project,
      code,

      cardindexi: cardindexi,
    };
  }

  const rows = [];

  const roes1 = () => {
    for (let i = 0; i < datacardindex.length; i++) {
      rows.push(
        createData(
          datacardindex[i]?.projectsunion[0].project,
          datacardindex[i]?.projectsunion[0].code,
          datacardindex[i]?.projectsunion
        )
      );
    }
  };

  roes1();

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const contingdebt = row.cardindexi.map((debt) => debt.debt);

    let conter = 0;
    let conterebt = 0;

    for (let i = 0; i < contingdebt.length; i++) {
      if (parseInt(contingdebt[i])) {
        conterebt += parseInt(contingdebt[i]);
      }
    }

    const contingreciev = row.cardindexi.map((reciev) => reciev.reciev);
    let conterreciev = 0;

    for (let i = 0; i < contingreciev.length; i++) {
      if (parseInt(contingreciev[i])) {
        conterreciev += parseInt(contingreciev[i]);
      }
    }
    if (conterebt === 0) {
      conter = conterreciev;
    } else {
      conter = conterebt;
    }

    const [className, setclassName] = useState(false);
    useEffect(() => {
      if (conterebt === 0) {
        setclassName("Projecttaleincome");
      } else {
        setclassName("Projecttaleoutcome");
      }
    }, []);
    const corentbudget = row.cardindexi[0].budget;

    return (
      <React.Fragment>
        <TableRow className={classes.root} className={className}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.project}
          </TableCell>
          <TableCell align="center">{row.code}</TableCell>

          <TableCell align="center">{corentbudget}</TableCell>
          <TableCell align="center">{conter}</TableCell>
          <TableCell align="center">{corentbudget - conter}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <Karteset data={row.cardindexi} /> */}
              <Projactsection data={row.cardindexi} />
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
              <TableCell align="center">פרויקט</TableCell>
              <TableCell align="center">קוד כרטיס</TableCell>
              <TableCell align="center">תקציב</TableCell>
              <TableCell align="center">ביצוע</TableCell>
              <TableCell align="center">יתרה/גרעון</TableCell>
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

export default Projectcode;
