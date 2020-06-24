import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './nav_bar'
import HomePosiExamples from './home_examples_pos'
import HomeNegExamples from './home_examples_neg'


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

  export default function Home(props) {


    const classes = useStyles ();
    
        return (
            <div> 
              <NavBar/>
              
             
              <br/>

              <HomePosiExamples/>
              <HomeNegExamples/>
            </div>
        )
    }
    
 
 

 