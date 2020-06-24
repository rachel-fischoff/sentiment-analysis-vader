import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme) => ({

  overrides: {
    MuiListItem: {
      root: {
        textAlign: 'center',
        alignItems: 'center',
      },

    }
  },
    root: {
      textAlign: 'center',
        display: 'flex',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
      },
      chip: {
        margin: theme.spacing(0.5),

      },
      list: {
        display: 'block',
        alignItem: 'center',
        textAlign: 'center',
    
      },
    }
  ));
  

export default function NGramTextResults(props) {

    const [dataset, setDataset] = useState({ngrams: [], scores: [{ 'compound': 0, 'neg': 0, 'neu': 0, 'pos': 0}], total_words: []})
    console.log(props)
    const classes = useStyles ();
    
  // if the data is there then send a get request and if it's not there then wait 10 seconds. 


    // const fetchData = async () => {
    //     const response = await axios.get('http://localhost:5000/ngrams')
    //     .then((response) => {
    //       console.log(response, 'response');
    //     }, (error) => {
    //       console.log(error, 'error');
    //     });
    //     setDataset(response.data)
        
    // }

    useEffect(() => {
        setDataset (props.dataset)
    }, []);

    const renderNgramChips = () => {

      const combinedArray = dataset.ngrams.map((item, index) => {
          return [item, dataset.scores[index], dataset.total_words[index]];
          })
      
       const posNgrams = []
       const negNgrams = []
       const neuNgrams = []
       const otherNgrams = []


  
  
       //  Line 86:40:  Expected to return a value in arrow function  array-callback-return
      combinedArray.map((element, index) => {

          if(combinedArray[index][1].pos > 0) 
          posNgrams.push(element)
          else if (combinedArray[index][1].neg > 0)
          negNgrams.push(element)
          else if((combinedArray[index][1].neu > 0))
          neuNgrams.push (element)
          else
          otherNgrams.push(element)
             
      })
  
        return (
        <div  className = {classes.root}>
  
          <CardContent>
            <List >
              <ListItem className = {classes.list}>
                  <Typography> positive </Typography>
                  <br/>
                 {posNgrams.map((element, index) =>
              
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 style={{backgroundColor:'#4caf50'}}
                 key={index}
                 /> 
               
                 )}
                </ListItem>
                <Divider  component="li"/>
  
                <ListItem className = {classes.list}>
                <Typography> neutral </Typography>
                  <br/>
                 {neuNgrams.map((element, index) => 
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 key={index}
                 style={{backgroundColor:'#ffee58'}}
              
                 /> )}
              </ListItem>
                  <Divider  component="li"/>
                  <ListItem className = {classes.list}>
                  <Typography> negative </Typography>
                  <br/>
                 {negNgrams.map((element, index) =>
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 style={{backgroundColor: '#d32f2f' }}
                 key={index}
                 /> )}
                </ListItem>
  
              <Divider  component="li"/>
              <Typography> words not counted </Typography>
              <br/>
              {otherNgrams.map((element, index) =>
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 style={{backgroundColor: '#2196f3' }}
                 key={index}
                 /> )}
            </List>
          </CardContent>
        </div>
        )
      }
  
  
  
      return (
      
          <div>
              {renderNgramChips()}
  
          </div>
      )
  
  }
