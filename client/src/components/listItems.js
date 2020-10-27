import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Route>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="מסך ניהול " />
        </ListItem>
      </Link>
      <Link to="/dashboard/manegment">
        <ListItem button>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="בסיס נתונים" />
        </ListItem>
      </Link>
      <Link to="/dashboard/Mailestones">
        <ListItem button>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="אבני דרך " />
        </ListItem>
      </Link>
    </Route>
  </div>
);

export const secondaryListItems = (
  <Route>
    <div>
      <ListSubheader inset>דוחות ביצוע</ListSubheader>
      <Link to="/dashboard/Reports">
        <ListItem button>
          <ListItemIcon>
            {" "}
            <AssignmentIcon />
            </ListItemIcon>
          <ListItemText primary="תקציב מול ביצוע" />
        </ListItem>
      </Link>
      
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  </Route>
);
