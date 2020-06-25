import React from 'react';
import { useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import NavBar from './nav_bar'
import NGramTwitterResults from './n_gram_twitter'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: '1px solid #d3d4d5',
        margin: 'auto',

      },
    box : {
        margin: 'auto',
        width: '80%',
      }, 
    moreIcon: {
      marginLeft: 'auto'
      
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      textAlign: 'center',
    },
  }));

  export default function TwitterResults(props) {
  
  const classes = useStyles();
  const term = props.location.state.term

  const [expanded, setExpanded] = useState(false);
  const [tweets, setTweets] = useState([{'created_at': '', 'profile_pic': '', 'text': '', 'user_screen_name': ''}]);
  const [words, setWords] = useState([])
  const [dataset, setDataset] = useState({ngrams: [], scores: [{ 'compound': 0, 'neg': 0, 'neu': 0, 'pos': 0}], total_words: []})


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = async () => {
    axios.post('http://localhost:5000/twitter', {
      'term': term
      },console.log(term))
      .then(response => 
      setTweets(response.data.tweets))
      .then(data => {
        axios.get('http://localhost:5000/twitter/words')
          .then(response => 
            setWords(response.data))
          .then(data => {
            axios.get('http://localhost:5000/twitter/ngrams')
              .then(response => setDataset(response.data))
          })
      })
      .catch(error => console.log(error));

}

useEffect(() => {
  fetchData();
}, []);



    return (
      
        <div className={classes.root}>
          <NavBar/>
          {tweets.map((element, index) => 
            <Box className={classes.box} key={index}>
            <Paper className={classes.paper} >
            <Avatar aria-label="tweet" className={classes.large} src = {element.profile_pic}>
                
                </Avatar>
                <Typography paragraph>  {element.user_screen_name} </Typography>
                <Typography color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
                {term}
                <br/>
           
                </Typography>
               
                <Typography paragraph>
                  {element.text}
               

                  <br/>
                  {words.map((element, index)  => { 
                      if(element[2].pos > 0) {
           
                      return (
                    <Chip
                    className ={classes.chip}
                    label = {element[0]}
                    clickable
                    style={{backgroundColor:'#4caf50'}}
                    key={index}
                    /> )
                      }
                
                      if (element[2].neu > 0) {
                      return (
                    <Chip
                    className ={classes.chip}
                    label = {element[0]}
                    clickable
                    style={{backgroundColor:'#ffee58'}}
                    key={index}
                    /> 
                      )
                      }
                      if(element[2].neg > 0) {
                        return (
                      <Chip
                      className ={classes.chip}
                      label = {element[0]}
                      clickable
                      key={index}
                      style={{backgroundColor:'#d32f2f'}}
                      /> 
                        )
                        }
                        else{
                          return(
                        <Chip
                        className ={classes.chip}
                        label = {element[0]}
                        clickable
                        style={{backgroundColor: '#2196f3' }}
                        key={index}
                        /> 
                    )} 
                    
                    })}


                      <br/>
  
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
         
                > 
                View NGrams
                <ExpandMoreIcon className={classes.moreIcon}/>
                </IconButton>
                </Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGramTwitterResults dataset = {dataset}/>
            </Collapse>     
            </Paper>
            </Box>
            )}
        </div>
)
}