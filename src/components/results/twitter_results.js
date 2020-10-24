import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import NavBar from "../nav_bar";
import NGramTwitterResults from "../ngrams/n_gram_twitter";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import SwitchTwitterWords from "../switch/switch_twitter_words";
import TweetEmbed from "react-tweet-embed";

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
  moreIcon: {
    marginLeft: "auto",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    textAlign: "center",
  },
  avatar: {
    float: "left",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function TwitterResults(props) {
  const classes = useStyles();
  const term = props.location.state.term;

  const [expanded, setExpanded] = useState(false);
  const [showVader, setShowVader] = useState(true);
  // const [showTf, setShowTf] = useState(false);
  const [tweets, setTweets] = useState([
    { created_at: "", profile_pic: "", text: "", user_screen_name: "", id: "" },
  ]);
  const [words, setWords] = useState([]);
  const [dataset, setDataset] = useState({
    ngrams: [],
    scores: [{ compound: 0, neg: 0, neu: 0, pos: 0 }],
    total_words: [],
  });
  // const [tfWords, setTfWords] = useState([]);
  // const [tfDataset, setTfDataset] = useState({
  //   ngram: [],
  //   score: [],
  //   totalwords: [],
  // });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showAlternativeModel = () => {
    setShowVader(!showVader);
    // setShowTf(!showTf);
  };

  const fetchData = async () => {
    axios
      .post("/twitter", {
        term,
      })
      .then((response) => setTweets(response.data.tweets))
      .then(() => {
        axios
          .get("/twitter/words")
          .then((response) => setWords(response.data))
          .then(() => {
            axios
              .get("/twitter/ngrams")
              .then((response) => setDataset(response.data))
              .then(() => {
                // axios
                //   .get("http://localhost:5000/tf_twitter/words")
                //   .then((response4) => setTfWords(response4.data))
                //   .then(() => {
                //     axios
                //       .get("http://localhost:5000/tf_twitter/ngrams")
                //       .then((response5) => setTfDataset(response5.data));
                //   });
              });
          });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      {tweets.map((element, index) => (
        <Box className={classes.box} key={index}>
          <Typography
            component={"span"}
            color="textPrimary"
            fontWeight="fontWeightBold"
            variant="h6"
          >
            Your Search Term is {term}
            <br />
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "550px",
            }}
          >
            <TweetEmbed
              id={element.id}
              placeholder={"loading"}
              style={{ minWidth: "550px" }}
            />
          </div>

          <Paper className={classes.paper}>
            <Typography component={"span"}>
              {element.text}

              <br />
              <br />
              <SwitchTwitterWords showAlternativeModel={showAlternativeModel} />
              <br />

              {showVader && (
                <div>
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
                  <br />
                  VADER ANALYZER
                </div>
              )}
              {/* {showTf && (
                <div>
                  {tfWords.map((element, index) => {
                    if (element[1] > 0) {
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

                    if (element[1] < -0.5) {
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
                    if (0 > element[1] > -0.5) {
                      return (
                        <Chip
                          className={classes.chip}
                          label={element[0]}
                          clickable
                          key={index}
                          style={{ backgroundColor: "#ffee58" }}
                        />
                      );
                    }
                  })}
                  <br />
                  MY TENSORFLOW MODEL */}
                {/* </div> */}
              {/* )} */}

              <br />

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                View N-Grams
                <ExpandMoreIcon className={classes.moreIcon} />
              </IconButton>
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <NGramTwitterResults dataset={dataset} />
            </Collapse>
          </Paper>
        </Box>
      ))}

      <Link to={{ pathname: "/twitter" }}>
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
}
