import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
// import IconButton from '@material-ui/core/IconButton';
// import MenuItem from '@material-ui/core/MenuItem';
// import NoSsr from '@material-ui/core/NoSsr';
// import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormGroup, FormControlLabel, IconButton, Snackbar,
  SnackbarContent, TextField, withStyles, Typography, Switch } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import Select from 'react-select';
import SampleData from './SampleData.js';
// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import CheckboxLabels from './CheckboxLabels.jsx';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
    padding: 50,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  // starting here down, this is for the toggle
  // colorBar: {},
  // colorChecked: {},
  // iOSSwitchBase: {
  //   '&$iOSChecked': {
  //     color: theme.palette.common.white,
  //     '& + $iOSBar': {
  //       backgroundColor: '#52d869',
  //     },
  //   },
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //     easing: theme.transitions.easing.sharp,
  //   }),
  // },
  // iOSChecked: {
  //   transform: 'translateX(15px)',
  //   '& + $iOSBar': {
  //     opacity: 1,
  //     border: 'none',
  //   },
  // },
  // iOSBar: {
  //   borderRadius: 13,
  //   width: 42,
  //   height: 26,
  //   marginTop: -13,
  //   marginLeft: -21,
  //   border: 'solid 1px',
  //   borderColor: theme.palette.grey[400],
  //   backgroundColor: theme.palette.grey[50],
  //   opacity: 1,
  //   transition: theme.transitions.create(['background-color', 'border']),
  // },
  // iOSIcon: {
  //   width: 24,
  //   height: 24,
  // },
  // iOSIconChecked: {
  //   boxShadow: theme.shadows[1],
  // },
};
// variantIcon and styles1 for snackbar
const variantIcon = {
  success: CheckCircleIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      zipcode: props.zipcode,
      userPlants: props.plants,
      open: false,
      description: '',
      image: '',
      loggedIn: false,
      currency: 'Select',
      userId: this.props.id,
      checkedB: true, // for the toggle
      liked: true, // like button
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.handleLike = this.handleLike.bind(this); // like button
    this.handleToggle = this.handleToggle.bind(this); // checkbox for plant to be "on"
  }

  // remove plant from your plants completely
  deleteButton(plantId) {
    console.log('delete button clicked');
    console.log(this.state.userId);
    console.log('works', plantId);
    const { userId } = this.state;
    axios({
      method: 'delete',
      url: '/plant',
      data: {
        username: userId,
        idplant: plantId,
      },
    })
      .then(() => {
        console.log('plant removed');
      })
      .catch((err) => { console.log('could not delete plant', err); });
  }

  // like toggle button to indicate no more plucking, but still on your plant profile
  toggleButton() {
    console.log('like toggle button clicked');
    // const { userId } = this.state;
    // const { plantId } = this.props;
    // axios.post('/user/toggle', { userId, plantId })
    //   .then(() => console.log('plant toggled'))
    //   .catcch((err) => { console.log(`${err} in toggling plant`); });
  }

  // for the form that adds a plant demo version
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  // handleChange(name) {
  //   return (event) => {
  //     this.setState({ [name]: event.target.checked });
  //   };
  // }
  // // for toggle plant
  // // changed from double arrow, may not work!!
  // handleChange(name) {
  //   return event => this.setState({ [name]: event.target.checked });
  // }

  // like button
  handleLike(plantId, bool) {
    console.log('like button toggled');
    console.log(plantId, bool);
  }

  // toggle plant on and off for plucking
  handleToggle(plantId) {
    console.log('checkbox for plucking');
    console.log(plantId);
    axios({
      method: 'put',
      url: '/toggle',
      data: {
        idplant: plantId,
      },
    })
      .then(() => {
        console.log('plant plucking toggle clicked');
      })
      .catch((err) => { console.log(`plant plucking toggle unsuccessful due to ${err}`); });
  }

  // render username, zip, and user plants dynamically
  // Get user plant on profile mount
  componentDidMount() {
    const componentThis = this;
    axios({
      method: 'get',
      url: `/user/profile?username=${componentThis.state.username}`,
    }).then((aResponse) => {
      componentThis.setState({ userPlants: aResponse.data });
    }).catch((err) => {
      console.log(err);
    });
  }

// render username, zip, and user plants dynamically
  render() {
    const { classes, handleChange } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          gutterBottom
          // align="center"
        >
          {this.state.username.toUpperCase()}
        </Typography>

        {/* <Typography
          variant="subtitle1"
          gutterBottom
        >
          {this.state.zipcode}
        </Typography> */}

        <div className={classes.root}>

          <Typography
            variant="subtitle1"
            gutterBottom
          >
          Your Plants
          </Typography>

          {this.state.userPlants === undefined ? null : this.state.userPlants.map((plant) => {
            return (
              <Card className={classes.card} key={plant.id}>
                <CardHeader
                  title={plant.title}
                />
                <CardMedia
                  className={classes.media}
                  image={plant.imagelink}
                  title={plant.title}
                />
                <CardContent>
                  <Typography component="p">
                    {plant.address}, {plant.zipcode} <br />
                    {plant.description}
                  </Typography>
                </CardContent>
                <IconButton aria-label="delete this plant" onClick={() => {this.deleteButton(plant.id)}}>
                  <DeleteOutlinedIcon className={classes.icon} />
                </IconButton>
                <IconButton aria-label="toggle on and off" onClick={this.toggleButton}>
                  {/* <Toggle style={iconStyles} color={red500} hoverColor={greenA200} /> */}
                  <FavoriteIcon />
                </IconButton>
                <FormControlLabel
                  control={(
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      value="checkedH"
                      onClick={() => {
                        this.handleLike(plant.id);
                      }}
                    />
                  )}
                  label="Like"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      icon={<CheckBoxIcon fontSize="small" />}
                      checkedIcon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      value="checkedI"
                      onClick={() => {
                        this.handleToggle(plant.id);
                      }}
                    />
                  )}
                  label="Ready for Plucking"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state[`{plant.id}`]}
                      onChange={handleChange(plant.title)}
                      value="liked"
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Custom color"
                />
              </Card>
            );
          })
          }
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Add a Plant
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add a new plant for fellow Pluckers to Pluck!
              </DialogContentText>
              <TextField
                id="outlined-with-placeholder"
                label="Pluck Me!"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-with-placeholder"
                label="Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-with-placeholder"
                label="Zip Code"
                placeholder="Placeholder"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(MyProfile);
