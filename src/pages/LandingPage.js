import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import Features from "../components/LandingPage/Features";
import { GlobalContext } from "../contexts/GlobalState";
import Video from "../components/LandingPage/VideoSection/Video.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  // Getting notifications from the Global State!
  const { notifications } = useContext(GlobalContext);

  return (
    <Container classes={classes} maxWidth="lg">
      <Video />
    </Container>
  );
}
