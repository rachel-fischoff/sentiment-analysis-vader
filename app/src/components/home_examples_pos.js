import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import InputIcon from "@material-ui/icons/Input";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import axios from "axios";
import NGramExampleResults from "./n_gram_examples";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    border: "1px solid #d3d4d5",
    margin: "auto",
  },
  box: {
    margin: "auto",
    width: "80%",
  },
  typography: {},
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function HomePosiExamples() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [dataset, setDataset] = useState({
    ngrams: [],
    scores: [{ compound: 0, neg: 0, neu: 0, pos: 0 }],
    total_words: [],
  });
  const [words, setWords] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/home/pos")
      .then((response) => setDataset(response.data))
      .then((data) => {
        axios
          .get("http://localhost:5000/home/pos/words")
          .then((response) => setWords(response.data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSentiment = () => {
    return (
      <div>
        <br />
        {words.map((element, index) => {
          if (element[2].pos > 0) {
            return (
              <Chip
                className={classes.chip}
                label={element[0]}
                clickable
                style={{ backgroundColor: "#4caf50" }}
                key={index}
              />
            );
          }

          if (element[2].neg > 0) {
            return (
              <Chip
                className={classes.chip}
                label={element[0]}
                clickable
                style={{ backgroundColor: "#d32f2f" }}
                key={index}
              />
            );
          }
          if (element[2].neu > 0) {
            return (
              <Chip
                className={classes.chip}
                label={element[0]}
                clickable
                key={index}
                style={{ backgroundColor: "#ffee58" }}
              />
            );
          } else {
            return (
              <Chip
                className={classes.chip}
                label={element[0]}
                clickable
                style={{ backgroundColor: "#2196f3" }}
                key={index}
              />
            );
          }
        })}
      </div>
    );
  };

  //
  return (
    <div className={classes.root}>
      {/* Probably going to map the data from a json file or database or even csv to here ? */}
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Typography className={classes.typography} variant="h4">
            "Sometimes your joy is the source of your smile, but sometimes your
            smile can be the source of your joy." ― Thich Nhat Hanh
            <br />
            {renderSentiment()}
            <br />
          </Typography>

          <Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {" "}
              View NGrams
              <ExpandMoreIcon />
            </IconButton>
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <NGramExampleResults dataset={dataset} />
          </Collapse>
        </Paper>
      </Box>
    </div>
  );
}
