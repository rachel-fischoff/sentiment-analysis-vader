import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import NavBar from "./nav_bar";
import NGramTextResults from "./n_gram_text";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import Switches from "./switch";

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
  typography: {
    // fontWeight: 'bold'
  },
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function TextResults(props) {
  const classes = useStyles();

  const inputValue = props.location.state.inputValue;

  const [expanded, setExpanded] = useState(false);
  const [words, setWords] = useState([]);
  const [dataset, setDataset] = useState({
    ngrams: [],
    scores: [{ compound: 0, neg: 0, neu: 0, pos: 0 }],
    total_words: [],
  });
  const [TfWords, setTfWords] = useState([]);
  const [TfDataset, setTfDataset] = useState({
    ngram: [],
    score: [],
    totalwords: [],
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = async () => {
    axios
      .post("http://localhost:5000/text", {
        text: inputValue,
      })
      .then((data) => {
        axios
          .get("http://localhost:5000/text/words")
          .then((response2) => setWords(response2.data))
          .then((data) => {
            axios
              .get("http://localhost:5000/text/ngrams")
              .then((response3) => setDataset(response3.data))
              .then((data) => {
                axios
                  .get("http://localhost:5000/tf/words")
                  .then(
                    (response4) => (
                      setTfWords(response4.data), console.log(response4.data)
                    )
                  )
                  .then((data) => {
                    axios
                      .get("http://localhost:5000/tf/ngrams")
                      .then(
                        (response5) => (
                          setTfDataset(response5.data),
                          console.log(response5.data)
                        )
                      );
                  });
              });
          });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Figure out how to map from dataset
  const renderText = () => (
    <div className={classes.root}>
      <NavBar />

      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Typography className={classes.typography} variant="h4">
            {inputValue}
          </Typography>

          <br />

          <br />
          <div  >
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

            if (element[2].neu > 0) {
              return (
                <Chip
                  className={classes.chip}
                  label={element[0]}
                  clickable
                  style={{ backgroundColor: "#ffee58" }}
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
                  key={index}
                  style={{ backgroundColor: "#d32f2f" }}
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
          <br/>
          <Switches />

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
            <NGramTextResults dataset={dataset} />
          </Collapse>
        </Paper>
      </Box>

      <Link to={{ pathname: "/text" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
          startIcon={<ArrowBackIcon>ArrowBackIcon</ArrowBackIcon>}
        >
          Go Back
        </Button>
      </Link>
      <Link to={{ pathname: "/home" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
          startIcon={<HomeIcon>HomeIcon</HomeIcon>}
        >
          Home
        </Button>
      </Link>
    </div>
  );

  return <div>{renderText()}</div>;
}
