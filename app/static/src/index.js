import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Home from "./components/home";
import TwitterResults from "./components/twitter_results";
import TextResults from "./components/text_results";
import SearchBarText from "./components/search_bar_text";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchBarTweet from "./components/search_bar_twitter";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <CssBaseline />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/twitter" component={SearchBarTweet} />
              <Route
                exact
                path="/twitter/sentiment"
                component={TwitterResults}
              />
              <Route exact path="/text" component={SearchBarText} />
              <Route exact path="/text/sentiment" component={TextResults} />
            </Switch>

        </React.Fragment>
      </Router>
    </ThemeProvider>,
    document.getElementById("root")
  );
