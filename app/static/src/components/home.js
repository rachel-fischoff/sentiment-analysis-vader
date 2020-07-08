import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./nav_bar";
import HomePosiExamples from "./home_examples_pos";
import HomeNegExamples from "./home_examples_neg";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  overrides: {
    MuiListItem: {
      root: {
        textAlign: "center",
        alignItems: "center",
      },
    },
  },
  root: {
    textAlign: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  list: {
    display: "block",
    alignItem: "center",
    textAlign: "center",
  },
  typography: {
    textAlign: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <NavBar />
      <br />

      <Typography className={classes.typography} variant="h4">
        Welcome to my Sentiment Analysis Application!
      </Typography>
      <br />
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            What is Sentiment Analysis?
          </Typography>
          <Typography className={classes.secondaryHeading}>
            NLTK Vader + TensorFlow
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            "Sentiment analysis, or opinion mining, is an active area of study
            in the field of natural language processing that analyzes people's
            opinions, sentiments, evaluations, attitudes, and emotions via the
            computational treatment of subjectivity in text"
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>
            How does the app work?
          </Typography>
          <Typography className={classes.secondaryHeading}>
            original text analysis + twitter textual analysis
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            enter original text or search twitter '[add all the query options
            for twitter]'
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>
            What do the colors mean?
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Red, yellow, green + blue
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>neg, neu, pos + not counted</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>What are n-grams?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>N grams</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>Text Examples</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <HomePosiExamples />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography className={classes.heading}>Twitter Example</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <HomeNegExamples />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <br />
    </div>
  );
}
