import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

// Get Components
import OutreachDefinition from "../components/LandingPage/OutreachDefinition/OutreachDefinition";
import Outreachuserflow from "../components/LandingPage/Outreach-Userflow/Outreachuserflow";
import AllFeatures from "../components/LandingPage/Features-Section/AllFeatures";
import Video from "../components/LandingPage/VideoSection/Video.js";
import Donation from "../components/LandingPage/Donation/Donation";

// Landing Page
export default function LandingPage() {
  const classes = useStyles();

  return (
    <Container classes={classes} maxWidth="lg">
      {/* Section - HEADER */}

      {/* Section - HERO */}
      <Video />

      {/* Section - WHAT IS OUTREACH */}
      <OutreachDefinition />

      {/* Section - HOW OUTREACH HELPS (features) */}
      <AllFeatures />

      {/* Section - HOW OUTREACH WORKS  */}
      <Outreachuserflow />

      {/* Section - DONATION */}
      <Donation />
      {/* Section - DOWNLOAD */}

      {/* Section - FOOTER */}
    </Container>
  );
}

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
