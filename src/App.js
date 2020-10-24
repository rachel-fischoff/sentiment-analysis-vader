import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Home from "./components/home/home";
import TwitterResults from "./components/results/twitter_results";
import TextResults from "./components/results/text_results";
import SearchBarText from "./components/search_bars/search_bar_text";
import SearchBarTweet from "./components/search_bars/search_bar_twitter";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <CssBaseline />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/twitter" component={SearchBarTweet} />
            <Route exact path="/twitter/sentiment" component={TwitterResults} />
            <Route exact path="/text" component={SearchBarText} />
            <Route exact path="/text/sentiment" component={TextResults} />
          </Switch>
        </React.Fragment>
      </Router>
    </ThemeProvider>
  );
}
