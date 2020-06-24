import React from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input'
import axios from 'axios'
import NavBar from './nav_bar'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
    button: {
        margin: theme.spacing(1),
      },
  }));

  
export default function SearchBarTwitter () { 
  
    const [term, setTerm] = useState('');
    
    const classes = useStyles();
  
    const handleChange = (event) => {
      setTerm(event.target.value);
    };
  
      return ( 
          <div>
            <NavBar/>
                <div className={classes.root} >
                <h2>Find Tweets by Subject</h2>
        
                    <OutlinedInput id="component-outlined 2"  placeholder = "Twitter Coming Soon" value={term} onChange={handleChange}/>
                    <Link to={{ pathname: "/twitter/sentiment", state: {term: term}}}>
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
  

