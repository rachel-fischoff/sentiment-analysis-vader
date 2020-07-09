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
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function HomeNegExamples() {
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
    const response = await axios.get("http://localhost:5000/home/neg");
    setDataset(response.data);
  };

  const fetchWords = async () => {
    const response = await axios.get("http://localhost:5000/home/neg/words");
    setWords(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSentiment = () => {
    return (
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
      <Box className={classes.box}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "550px",
          }}
        >
          <TweetEmbed id="1268166288993632256" />
        </div>

        <Paper className={classes.paper}>
          <Typography>
            should i put the text here ? grayed out?
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="small"
              type="submit"
              startIcon={<InputIcon>InputIcon</InputIcon>}
              onClick={fetchWords}
            >
              Show Sentiment
            </Button>
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
