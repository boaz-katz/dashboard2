import React, { useState, useEffect } from "react";
import { cardindex } from "../../data/data";
import { formatCountdown } from "antd/lib/statistic/utils";
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
import ReacttoExcel from "react-html-table-to-excel";
import { PanTool } from "@material-ui/icons";

function ReportsbudgVexection(props) {
  const [income, setincome] = useState([]);
  const [expebses, setexpebses] = useState([]);

  const [datacardindex, setcardindex] = useState([]);

  useEffect(() => {
    filterdata(props.data);
  }, [props.data]);

  ////  maiking arry of projects
  const filterdata = (arry) => {
    const expebsesarry = [];
    const incomearry = [];
    let arryofprojects = [];
    if (arry) {
      const projects = arry.map((newob) => newob.cardcode);
      const uniqueArray = projects.filter((item, pos) => {
        return projects.indexOf(item) == pos;
      });

      for (let i = 0; i < uniqueArray.length; i++) {
        const projectsunion = arry.filter(
          (item) => item.cardcode === uniqueArray[i]
        );
        arryofprojects.push({ projectsunion });
      }
      // return arryofprojects;
      setcardindex(arryofprojects);
  
      arryofprojects.map((item) => {
        if (item.projectsunion[0].debt) {
        
          expebsesarry.push(item);
        } else {
          incomearry.push(item);
        }
      });
    }
    setincome(incomearry);
    setexpebses(expebsesarry);
  };

  
  let totalexpebses=0
  let totalincome = 0 
  const corebtbudget = () => {
    income.map((item) => {
      const x = item.projectsunion.map(
        (element) => element
        
        );
        
        
        let sumincome = 0;
        for(let i = 0 ;i< x.length;i++){
          sumincome += x[i].reciev
          totalincome +=x[i].reciev
        }
        x[0].total = sumincome
      
        
      });
      
      expebses.map((item) => {
        const x = item.projectsunion.map((element) => element);
        let sunexpebses = 0;
      
        for(let i = 0 ;i< x.length;i++){
          sunexpebses+= x[i].debt
          totalexpebses+=x[i].debt
         }
         x[0].total = sunexpebses
        
         
       });
    
      
    
    };
    corebtbudget();
    
    return (
      <div>
      <Box margin={1}>
        <div dir="rtl">
          <Typography variant="h6" gutterBottom component="div">
            <ReacttoExcel
              table="report1"
              filename="תקציב מול ביצוע"
              sheet="תקציב מול ביצוע"
              buttonText="export"
            />{" "}
            תקציב מול ביצוע
          </Typography>
        </div>

        <Table size="small" aria-label="purchases" id="report1" dir="rtl">
          <TableHead>
            <TableRow> תקציב מול ביצוע </TableRow>
            <TableRow>
              <TableCell>פרויקט</TableCell>
              <TableCell>קוד כרטיס</TableCell>
              <TableCell>קוד סעיף</TableCell>
              <TableCell>סעיף</TableCell>
              <TableCell>תקציב</TableCell>
              <TableCell>ביצוע </TableCell>
              <TableCell>יתרה /גרעון </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            >
              הכנסות
            </TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_income"
            ></TableCell>

            {income.map((cardindexiRow) => (
              <TableRow key={cardindexiRow.date}>
                <TableCell component="th" scope="row">
                  {cardindexiRow.projectsunion[0].project}
                </TableCell>
                <TableCell>{cardindexiRow.projectsunion[0].code}</TableCell>
                <TableCell component="th" scope="row">
                  {cardindexiRow.projectsunion[0].cardcode}
                </TableCell>

                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].cardname}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].budget}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].total}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].budget - cardindexiRow.projectsunion[0].total}
                </TableCell>
              </TableRow>
            ))}
            

            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            >
              הוצאות
            </TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            >{totalincome}</TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            {expebses.map((cardindexiRow) => (
              <TableRow >
                <TableCell component="th" scope="row">
                  {cardindexiRow.projectsunion[0].project}
                </TableCell>
                <TableCell>{cardindexiRow.projectsunion[0].code}</TableCell>
                <TableCell component="th" scope="row">
                  {cardindexiRow.projectsunion[0].cardcode}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].cardname}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].budget}
                </TableCell>
                <TableCell align="center">
    {cardindexiRow.projectsunion[0].total}
                </TableCell>
                <TableCell align="center">
                  {cardindexiRow.projectsunion[0].budget - cardindexiRow.projectsunion[0].total}
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

          
          <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            >
              סה"כ
            </TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            >{totalexpebses}</TableCell>
            <TableCell
              align="center"
              className="ReportsbudgVexection_space_expenses"
            ></TableCell>
        </Table>
      </Box>{" "}
    </div>
  );
}
export default ReportsbudgVexection;
