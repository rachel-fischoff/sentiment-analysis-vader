import React, {useState} from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function Switches(props) {
  const [state, setState] = useState({
    checkedA: false
  });


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(props)

    
  };

  return (
    <div>
      <FormGroup style={{ display: "inline-block" }}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Vader</Grid>
            <Grid item>
              <AntSwitch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            </Grid>
            <Grid item>My TF Model</Grid>
          </Grid>
        </Typography>
      </FormGroup>
    </div>
  );
}
