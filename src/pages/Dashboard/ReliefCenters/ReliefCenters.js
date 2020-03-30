import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Badge,
  TextField,
  InputAdornment,
  ThemeProvider
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

// Axios
import axios from "axios";

// Custom Components and Themes
import ReliefCenterActionCard from "../../../components/Dashboard/ReliefCenterActionCard";
import Theme from "../../../theme";

// ENV
const API_URL = process.env.REACT_APP_API_URL;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  // homeGrid: { backgroundColor: "#111C24" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    // backgroundColor: "#111C24"
  },
  volunteerRequests: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    }
  }
});

class ReliefCenters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      reliefCenters: [],
      reliefCenterSearchValue: ""
    };
  }

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/";

  // API Call
  getDataFromAPI = async relativePath => {
    await axios
      .get(`${API_URL}${relativePath}`)
      .then(response => {
        this.setState({
          reliefCenters: response.data
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };

  assignVolunteers = reliefCenterID => {
    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/assign`
    );
  };

  handleButtonPress(type) {
    // Get Relief Centers from the state
    const { reliefCenters } = this.state;

    // Oldest First Function
    const byOldestFirst = (a, b) => {
      const aTimeStampedAt = a.updatedAt || a.createdAt;
      const bTimeStampedAt = b.updatedAt || b.createdAt;

      if (aTimeStampedAt > bTimeStampedAt) {
        return 1;
      }
      if (bTimeStampedAt > aTimeStampedAt) {
        return -1;
      }
      return 0;
    };

    // Recent First Function
    const byRecentFirst = (a, b) => {
      const aTimeStampedAt = a.updatedAt || a.createdAt;
      const bTimeStampedAt = b.updatedAt || b.createdAt;

      if (aTimeStampedAt > bTimeStampedAt) {
        return -1;
      }
      if (bTimeStampedAt > aTimeStampedAt) {
        return 1;
      }
      return 0;
    };

    switch (type) {
      case "All":
        // code block
        break;
      case "Oldest":
        // code block
        reliefCenters.sort(byOldestFirst);
        this.setState({ reliefCenters });
        break;
      case "Recent":
        // code block
        reliefCenters.sort(byRecentFirst);
        this.setState({ reliefCenters });
        break;
      default:
      // code block
    }
  }

  componentDidMount() {
    this.getDataFromAPI("/relief-center/all/requirement");
  }

  render() {
    const { classes } = this.props;

    const { notifications, reliefCenters } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Title */}
        <Typography align="left" variant="h5" component="h3">
          Relief Centers{" "}
          <Typography variant="body2" component="span">
            - Action Needed
          </Typography>
        </Typography>

        {/* Internal Page: Search, Sort, and Request Form Button */}
        {!this.isHomePage() && (
          <Grid justify="flex-start" container xs="12">
            {/* Search Input */}
            <Grid item xs="6">
              <TextField
                fullWidth
                onChange={event =>
                  this.setState({ reliefCenterSearchValue: event.target.value })
                }
                id="outlined-search"
                label="Search Relief Center"
                type="search"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Sorting Button Group */}
            <Grid item xs="4">
              <Button
                onClick={() => this.handleButtonPress("All")}
                variant="outlined"
                color="primary"
              >
                All
              </Button>
              <Button
                onClick={() => this.handleButtonPress("Oldest")}
                variant="outlined"
                color="primary"
              >
                Oldest
              </Button>
              <Button
                onClick={() => this.handleButtonPress("Recent")}
                variant="outlined"
                color="primary"
              >
                Recent
              </Button>
            </Grid>

            {/* Request Form Button */}
            <Grid item xs="2">
              <Button variant="contained" color="primary">
                <Link to="/dashboard/relief-center-forms">Request Form</Link>
              </Button>
            </Grid>
          </Grid>
        )}

        {/* Relief Center Container */}
        <Paper className={classes.paper}>
          <Grid justify="center" container>
            {reliefCenters.length > 0 &&
              reliefCenters
                // .sort((a, b) => {
                //   return a.updatedAt > b.updatedAt ? 1 : -1;
                // })
                .filter(reliefCenter =>
                  reliefCenter.name
                    .toLowerCase()
                    .includes(this.state.reliefCenterSearchValue.toLowerCase())
                )
                .map(reliefCenter => (
                  <Grid item className={classes.hoverStyle}>
                    <ReliefCenterActionCard
                      name={reliefCenter.name}
                      list={reliefCenter.required}
                      onAssignClick={() =>
                        this.assignVolunteers(reliefCenter._id)
                      }
                    />
                    {reliefCenter.updatedAt}
                  </Grid>
                ))}
          </Grid>

          {/* See All Button (On Home Page) */}
          {this.isHomePage() && (
            <Grid container justify="flex-end">
              <Link to="/dashboard/relief-centers">
                <Button>See All</Button>
              </Link>
            </Grid>
          )}
        </Paper>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(withRouter(ReliefCenters));
