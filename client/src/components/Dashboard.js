import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link1 from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Totalbudget from "./Totalbudget";
import Deposits from "./Deposits";
import Budgettable from "./Budgettable";
import Management from "./Management";
import axios from "axios";
import Excel from "@grapecity/spread-excelio";
import { saveAs } from "file-saver";
import ReportsbudgVexection from "./Reports/ReportsbudgVexection";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Test from "./test"
import Mailestones from "./mailestones"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"boaz-katz©"}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard() {
  ///data from bookkeeping

  const [datafromshits, setdatafromshits] = useState();
  const [budgetdatafromshits, setbudgetdatafromshits] = useState();
  useEffect(() => {
    // setbudgetdata(budgetdindex);

    // setcardindex(cardindex);

    axios
      .get(
        `https://spreadsheets.google.com/feeds/list/1cUnrK2zXBEZzH2eQXVm59nH7pRhZC45_ztgOA9orI00/2/public/values?alt=json`
      )
      .then((res) => {
        console.log(res.data.feed.entry);
        setbudgetdatafromshits(res.data.feed.entry);
      });

    axios
      .get(
        "https://spreadsheets.google.com/feeds/list/1cUnrK2zXBEZzH2eQXVm59nH7pRhZC45_ztgOA9orI00/od6/public/values?alt=json"
      )
      .then((res) => {
        setdatafromshits(res.data.feed.entry);
      });
  }, []);

  function createData(
    cardcode1,
    cardname,
    date,
    debt1,
    id1,
    index,
    name,
    project,
    reciev1,
    code1
  ) {
    let cardcode = parseInt(cardcode1);

    let debt = parseInt(debt1);
    let id = parseInt(id1);
    let reciev = parseInt(reciev1);
    let code = parseInt(code1);
    return {
      cardcode,
      cardname,
      date,
      debt,
      id,
      index,
      name,
      project,
      reciev,
      code,
    };
  }

  const datacardindex = [];
  const Datatest = () => {
    if (datafromshits) {
      for (let i = 0; i < datafromshits.length; i++) {
        datacardindex.push(
          createData(
            datafromshits[i]?.gsx$cardcode?.$t,
            datafromshits[i]?.gsx$cardname?.$t,
            datafromshits[i]?.gsx$date?.$t,
            datafromshits[i]?.gsx$debt?.$t,
            datafromshits[i]?.gsx$id?.$t,
            datafromshits[i]?.gsx$index?.$t,
            datafromshits[i]?.gsx$name?.$t,
            datafromshits[i]?.gsx$project?.$t,
            datafromshits[i]?.gsx$reciev?.$t,
            datafromshits[i]?.gsx$code?.$t
          )
        );
      }
    }
  };

  function createbadgetData(id1, project, code1, cardcode1, cardname, budget1) {
    let cardcode = parseInt(cardcode1);

    let id = parseInt(id1);
    let budget = parseInt(budget1);
    let code = parseInt(code1);
    return {
      id,
      project,
      code,
      cardcode,
      cardname,
      budget,
    };
  }
  const budgetdata = [];
  const Databedgetset = () => {
    if (budgetdatafromshits) {
      for (let i = 0; i < budgetdatafromshits.length; i++) {
        budgetdata.push(
          createbadgetData(
            budgetdatafromshits[i]?.gsx$id?.$t,
            budgetdatafromshits[i]?.gsx$project?.$t,
            budgetdatafromshits[i]?.gsx$code?.$t,
            budgetdatafromshits[i]?.gsx$cardcode?.$t,
            budgetdatafromshits[i]?.gsx$cardname?.$t,
            budgetdatafromshits[i]?.gsx$budget?.$t
          )
        );
      }
    }
  };

  console.log(datacardindex);
  Datatest();
  console.log(datafromshits);
  Databedgetset();
  console.log("budgetdata:", budgetdata);

  const datawithbudget = () => {
    let arryofprojects = [];
    if (budgetdata && datacardindex) {
      for (let x = 0; x < datacardindex.length; x++) {
        const b = budgetdata.filter((y) => y.code === datacardindex[x]?.code);

        datacardindex[x].budget = b[0]?.budget;
        arryofprojects.push(datacardindex);
      }
    }
  };

  datawithbudget();

  // useEffect(() => {
  //   axios.get("http://localhost:9000/").then((res) => {
  //     console.log("data:", res.data);

  //     // setcardindextest(res.data);
  //   });
  // }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          ‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                  dir="rtl"
                >
                  בנימין טק
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                      <Totalbudget data={datacardindex} />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                      <Deposits />
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Budgettable data={datacardindex} />
                    </Paper>
                  </Grid>
                </Grid>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>
        </Route>
        <Route path="/dashboard/manegment">
          {" "}
          ‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                  dir="rtl"
                >
                  בנימין טק
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Management data={datacardindex} />
                    </Paper>
                  </Grid>
                </Grid>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>
        </Route>
        <Route path="/dashboard/Reports">
           <ReportsbudgVexection data={datacardindex} /> 
    
        </Route>
        <Route path="/dashboard/Mailestones">
        ‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫‫
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                  dir="rtl"
                >
                  בנימין טק
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
           {/* < Mailestones/> */}
           <Test data={datacardindex}/>
                      
                    </Paper>
                  </Grid>
                </Grid>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>
        </Route>







    

      </Switch>
    </Router>
  );
}
export default Dashboard;
