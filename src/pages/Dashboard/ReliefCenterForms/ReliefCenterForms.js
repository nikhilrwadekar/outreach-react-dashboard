import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  Typography,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Theme from "../../../theme";

// Styles
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});

export default class ReliefCenterForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOfCenter: "Flood",
      nameOfJob: "Driving",
      numberOfPeople: 0,
      typeOfJob: ""
    };
  }
  handleChange = e => {
    this.setState({ typeOfJob: e.target.value });
  };

  handleClick(event) {
    console.log(event.target);
  }
  // handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  // selectedDate = ()=>{

  // }

  StyledRadio = props => {
    const classes = useStyles();
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  };

  render() {
    const { nameOfCenter } = this.props;
    const { nameOfJob } = this.props;
    return (
      <ThemeProvider theme={Theme}>
        <Typography align="left" variant="h3">
          Relief Center Form
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="reliefCenterName">Relief Center Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nameOfCenter}
            onChange={this.handleChange}
          >
            <MenuItem value={"Tsnuami"}> Tsunami </MenuItem>
            <MenuItem value={"Flood"}> Flood </MenuItem>
            <MenuItem value={"Food"}> Food </MenuItem>
            <MenuItem value={"Other"}> Other </MenuItem>
          </Select>
        </FormControl>
        <Card style={{ padding: 50 }}>
          {this.state.numberOfPeople > 0 && this.state.typeOfJob && (
            <Typography align="left" variant="h4">
              Requesting {this.state.numberOfPeople} volunteers for{" "}
              {this.state.typeOfJob}
            </Typography>
          )}
          <FormControl fullWidth id="volunteerTab">
            <InputLabel id="volunteerDetail">Type of Job</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nameOfJob}
              onChange={this.handleChange}
            >
              <MenuItem value={"Driving"}> Driving </MenuItem>
              <MenuItem value={"Baby Sitting"}> Baby Sitting </MenuItem>
              <MenuItem value={"Cooking"}> Cooking </MenuItem>
              <MenuItem value={"Other"}> Other </MenuItem>
            </Select>
            <FormControl id="availability" component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                defaultValue="anyTime"
                aria-label="preference"
                name="customized-radios"
              >
                <FormControlLabel
                  value="anyTime"
                  control={<this.StyledRadio />}
                  label="Any Time"
                />
                <FormControlLabel
                  id="showDate"
                  onClick={this.handleClick}
                  value="preference"
                  control={<this.StyledRadio />}
                  label="Choose your preference"
                />
              </RadioGroup>

              <TextField
                defaultValue={this.state.numberOfPeople}
                onChange={e =>
                  this.setState({ numberOfPeople: e.target.value })
                }
                type="number"
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 1
                  }
                }}
                label="People Needed"
              ></TextField>
            </FormControl>
          </FormControl>
        </Card>
      </ThemeProvider>
    );
  }
}
