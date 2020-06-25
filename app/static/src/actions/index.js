import axios from "axios";

const ROOT_URL = 'http://localhost:5000/'

export const FETCH_TWEETS = 'FETCH_TWEETS';


//====================================================
//fetching current tweets    
export const fetchTweets=(term) => async (dispatch) => {

  axios.get(ROOT_URL

  ).then(function (response) {
    console.log("root url" + term, response)
    dispatch({ type: FETCH_TWEETS, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
    dispatch({ type: '', payload: error });
  });
};