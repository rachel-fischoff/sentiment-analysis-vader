import React from 'react';
import {useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input'
import NavBar from './nav_bar'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

  
export default function SearchBarText () { 
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')
  

  const handleInput = (event) => {
    setInputValue(event.target.value);
  }


    return ( 
          <div>
              <NavBar/>
              <div className={classes.root} >
              <h2>Enter Text</h2>
                  <OutlinedInput id="component-outlined 2" value={inputValue} onChange={handleInput}/>
                      <Link to={{ pathname: "/text/sentiment", state: {inputValue: inputValue}}}>
                      <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      size="large"
                      type = "submit"
                      startIcon={<InputIcon>InputIcon</InputIcon>}
                      // onClick={fetchData}
                      >
                      Predict Sentiment
                     </Button> 
                     </Link>  
              </div>
            </div>
          );
    }

 