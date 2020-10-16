import React from "react";
import { useEffect, useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SwitchTwitterNgrams from './switch_twitter_ngrams'

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
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  list: {
    display: "block",
    alignItem: "center",
    textAlign: "center",
  },
}));

export default function NGramTwitterResults(props) {
  const [dataset, setDataset] = useState({
    ngrams: [],
    scores: [{ compound: 0, neg: 0, neu: 0, pos: 0 }],
    total_words: [],
  });
  const [tfDataset, setTfDataset] = useState({
    ngram: [],
    score: [],
    totalwords: [],
  });
  const [showVader, setShowVader] = useState(true);
  const [showTf, setShowTf] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setDataset(props.dataset);
    setTfDataset(props.tfDataset);
  }, []);

  const showAlternativeModel = () => {
    setShowVader(!showVader);
    setShowTf(!showTf);
  };

  const renderNgramChips = () => {
    const combinedArray = dataset.ngrams.map((item, index) => {
      return [item, dataset.scores[index], dataset.total_words[index]];
    });

    const posNgrams = [];
    const negNgrams = [];
    const neuNgrams = [];
    const otherNgrams = [];

    //  Line 86:40:  Expected to return a value in arrow function  array-callback-return
    combinedArray.map((element, index) => {
      if (combinedArray[index][1].pos > 0) posNgrams.push(element);
      else if (combinedArray[index][1].neg > 0) negNgrams.push(element);
      else if (combinedArray[index][1].neu > 0) neuNgrams.push(element);
      else otherNgrams.push(element);
    });

    return (
      <div className={classes.root}>
         {showVader && (
        <CardContent>
          <List>
            <ListItem className={classes.list}>
              <Typography> positive </Typography>
              <br />
              {posNgrams.map((element, index) => (
                <Chip
                  className={classes.chip}
                  label={element[0]}
                  clickable
                  style={{ backgroundColor: "#4caf50" }}
                  key={index}
                />
              ))}
            </ListItem>
            <Divider component="li" />

            <ListItem className={classes.list}>
              <Typography> neutral </Typography>
              <br />
              {neuNgrams.map((element, index) => (
                <Chip
                  className={classes.chip}
                  label={element[0]}
                  clickable
                  key={index}
                  style={{ backgroundColor: "#ffee58" }}
                />
              ))}
            </ListItem>
            <Divider component="li" />
            <ListItem className={classes.list}>
              <Typography> negative </Typography>
              <br />
              {negNgrams.map((element, index) => (
                <Chip
                  className={classes.chip}
                  label={element[0]}
                  clickable
                  style={{ backgroundColor: "#d32f2f" }}
                  key={index}
                />
              ))}
            </ListItem>

            <Divider component="li" />
            <Typography> words not counted </Typography>
            <br />
            {otherNgrams.map((element, index) => (
              <Chip
                className={classes.chip}
                label={element[0]}
                clickable
                style={{ backgroundColor: "#2196f3" }}
                key={index}
              />
            ))}
          </List>
          VADER ANALYZER
        </CardContent>
         )}
      </div>
    );
  };

  const renderTfNgramChips = () => {
    const combinedArray = tfDataset.ngram.map((item, index) => {
      return [item, tfDataset.score[index], tfDataset.totalwords[index]];
    });

    const posNgrams = [];
    const negNgrams = [];
    const neuNgrams = [];

    //  Line 86:40:  Expected to return a value in arrow function  array-callback-return
    combinedArray.map((element, index) => {
      if (combinedArray[index][1] > 0) posNgrams.push(element);
      else if (combinedArray[index][1] < -0.5) negNgrams.push(element);
      else neuNgrams.push(element);
    });

    return (
      <div className={classes.root}>
        {showTf && (
          <div>
          <CardContent>
            <List>
              <ListItem className={classes.list}>
                <Typography> positive </Typography>

                {posNgrams.map((element) => (
                  <Chip
                    className={classes.chip}
                    label={element[0]}
                    clickable
                    style={{ backgroundColor: "#4caf50" }}
                    key={element[1]}
                  />
                ))}
              </ListItem>
              <Divider component="li" />

              <ListItem className={classes.list}>
                <Typography> neutral </Typography>
                <br />
                {neuNgrams.map((element) => (
                  <Chip
                    className={classes.chip}
                    label={element[0]}
                    clickable
                    key={element[1]}
                    style={{ backgroundColor: "#ffee58" }}
                  />
                ))}
              </ListItem>
              <Divider component="li" />
              <ListItem className={classes.list}>
                <Typography> negative </Typography>
                <br />
                {negNgrams.map((element) => (
                  <Chip
                    className={classes.chip}
                    label={element[0]}
                    clickable
                    style={{ backgroundColor: "#d32f2f" }}
                    key={element[1]}
                  />
                ))}
              </ListItem>

              <Divider component="li" />
            </List>
          </CardContent>
          MY TENSORFLOW MODEL
          </div>
        )}

      </div>
    );
  };

  return (
    <div>
      <SwitchTwitterNgrams showAlternativeModel={showAlternativeModel}/>
      {renderNgramChips()}
      {renderTfNgramChips()}
    </div>
  );
}
