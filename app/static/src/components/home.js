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
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  overrides: {
    MuiListItem: {
      root: {
        textAlign: "center",
        alignItems: "center",
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        display: "block",
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
  expansionPanelDetails: {
    root: {
      display: "block",
    },
  },
  link: {
    color: "#b388ff",
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
        <br />
        An introduction to Natural Language Processing (NLP) - <br/>
        a form of
        Artificial Intelligence(AI)!
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
            NLP, Sentiment Analysis, My TensorFlow Model & Natural Language
            Toolkit(NLTK)
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <strong style={{ color: "#834bff" }}>
              Natural Language Processing(NLP)
            </strong>{" "}
            is a form of Artificial Intelligence which focuses on the
            interactions between human language and computers. The aim of NLP is
            to decipher, understand, and interact with language in a practical
            and beneficial manner. Text Generation, Text Classification, Machine
            Translation, Speech Recognition & Sentiment Analysis make up NLP.
            Everyday examples include Grammarly, Google Translate, Siri, &
            Alexa.
            <br />
            <strong style={{ color: "#834bff" }}>Sentiment Analysis</strong> (or
            Opinion Mining) analyzes people's opinions, sentiments, evaluations,
            attitudes, and emotions via Machine Learning(ML). One application is
            for businesses to know their users' sentiments towards their
            products. Another application could recognize hate speech patterns
            on social media. Sentiments are typically classified as positive,
            negative or neutral.
            <br />
            <strong style={{ color: "#834bff" }}>My TensorFlow Model</strong> I
            started this journey constructing my own ML model using TensorFlow
            (an open source ML library to help you train and develop ML models)
            and along the way taught myself Python to be able to use its
            libraries and data analysis. After some trials and tribulations with
            finding datasets, I constructed my model using this a widely
            available imdb review
            <Link
              className={classes.link}
              href="https://www.tensorflow.org/datasets/catalog/imdb_reviews"
            >
              {" "}
              dataset
            </Link>
            . I learned how to prepare the text(data) so it could be used in a
            ML model. I tokenized the words to get numerical values for them,
            then I created numerical sequences for the sentences. I adjusted the
            sentences to be all the same length. I set the max number of words
            to tokenize and tweaked the paddings and out of vocabulary (OOV)
            words to create a better fit for the model.
            <br />
            <strong style={{ color: "#834bff" }}>
              Natural Language Toolkit (NLTK)
            </strong>{" "}
            "NLTK is a leading platform for building Python programs to work
            with human language data." When my ML model's results were
            underwhelming, I decide to implement the{" "}
            <Link
              className={classes.link}
              href="https://www.aaai.org/ocs/index.php/ICWSM/ICWSM14/paper/view/8109"
            >
              {" "}
              NLTK's Vader Sentiment Analyzer{" "}
            </Link>
            .
            <Link
              className={classes.link}
              href="https://github.com/cjhutto/vaderSentiment"
            >
              {" "}
              VADER{" "}
            </Link>{" "}
            (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon and
            rule-based sentiment analysis tool that is specifically attuned to
            sentiments expressed in social media.
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
            Write your own sentences + search Twitter by subject
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Select the menu in the left hand corner and choose to:
            <br />
            1) enter <strong style={{ color: "#834bff" }}>
              original text
            </strong>{" "}
            - or - <br /> 2) search{" "}
            <strong style={{ color: "#834bff" }}>twitter</strong> by subject
            <br /> then toogle between{" "}
            <strong style={{ color: "#834bff" }}>VADER</strong> and{" "}
            <strong style={{ color: "#834bff" }}>My TensorFlow Model</strong> to
            see the different analysis of words and N-grams.
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
            positive, negative, neutral or not counted
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block" }}>
          <Typography className={classes.typography}>
            <Chip
              className={classes.chip}
              label="positive"
              clickable
              style={{ backgroundColor: "#4caf50" }}
            />
            <Chip
              className={classes.chip}
              label="negative"
              clickable
              style={{ backgroundColor: "#d32f2f" }}
            />
            <Chip
              className={classes.chip}
              label="neutral"
              clickable
              style={{ backgroundColor: "#ffee58" }}
            />
            <Chip
              className={classes.chip}
              label="word not counted"
              clickable
              style={{ backgroundColor: "#2196f3" }}
            />
            <br /> VADER's analysis doesn't provide a score for words like "i"
            so I created the blue label to indicate those words.
          </Typography>
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
          <Typography className={classes.heading}>What are N-Grams?</Typography>
          <Typography className={classes.secondaryHeading}>
            relationships between words
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            An <strong style={{ color: "#834bff" }}>N-gram</strong> is a
            sequence of N words that help you find meaning when words are
            together.
            <br /> A 2-gram (or bi-gram) is a two-word sequence of words. In
            this application I use uni-grams, bi-grams, tri-grams and
            four-grams. I use Scikit-Learn to process the N-grams. <br /> <br />
            For example, "This is my sentiment analysis application." <br />{" "}
            <br />
            The <strong style={{ color: "#834bff" }}>Uni-grams</strong> are (
            "this", "is", "my", "sentiment", "analysis", "application"). <br />{" "}
            The <strong style={{ color: "#834bff" }}>Bi-grams</strong> are (
            "this is", "is my", "my sentiment", "sentiment analysis", "analysis
            application"). <br /> The{" "}
            <strong style={{ color: "#834bff" }}>Tri-grams</strong> are ("this
            is my", "is my sentiment", "my sentiment analysis", "sentiment
            analysis application"). <br /> Finally, the{" "}
            <strong style={{ color: "#834bff" }}>Four-grams</strong> are( "my
            sentiment analysis application","is my sentiment analysis", "this is
            my sentiment").
          </Typography>
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
          <Typography className={classes.heading}>Text Example</Typography>
          <Typography className={classes.secondaryHeading}>
            Quote by Thich Nhat Hanh
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Card>
            <CardMedia
              component="video"
              height="280"
              image={require("/Users/rachel/Desktop/Code/sentiment-analysis/app/templates/images/text_example_720.mov")}
              title="positive example"
              controls
            />
          </Card>
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
          <Typography className={classes.secondaryHeading}>
            Search for Trump
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Card>
            <CardMedia
              component="video"
              height="280"
              image={require("/Users/rachel/Desktop/Code/sentiment-analysis/app/templates/images/twitter_example.mov")}
              title="trump example"
              controls
            />
          </Card>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
