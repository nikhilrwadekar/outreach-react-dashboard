import React, { useState } from "react";

// Importing styles from stylesheet
import "./Features.css";

// Importing Typography component from material-ui
import Typography from "@material-ui/core/Typography";

const Features = ({ features }) => {
  // const { features } = this.props;

  // Mapping each feature
  const featureList = features.map(feature => {
    return (

      // Container for each feature
      <div className="feature" key={feature.id}>

        {/* FEATURE ICON */}
        <div>{feature.icon}</div>

        {/* FEATURE TITLE */}
        <div className="feature-title">{feature.title}</div>

        {/* FEATURE DESCRIPTION */}
        <div className="feature-description">{feature.description}</div>
      </div>
    );
  });

  // Rendering the feature-list
  return <div className="feature-list">{featureList}</div>;
};

export default Features;