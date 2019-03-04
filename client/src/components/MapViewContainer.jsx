import React from 'react';
import axios from 'axios';
import MapView from './MapView.jsx';
import PlantBar from './PlantBar.jsx';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    margin: 0,
    bottom: 50,
    right: 50,
    position: 'fixed',
    backgroundColor: '#000000',
  },
});

class MapViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
    };
    this.getAddress = this.getAddress.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  getLocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      const geoOptions = {
        timeout: 10 * 1000,
      };
      const geoSuccess = (position) => {
        const currentLoc = [position.coords.latitude, position.coords.longitude];
        const [latitude, longitude] = currentLoc;
        this.setState(({ viewport }) => ({
          viewport: {
            latitude,
            longitude,
            ...viewport,
          },
        }));
      };
      const geoError = (error) => {
        console.log('Error occurred. Error code: ', error.code);
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }

  getAddress() {
    axios.get('/health')
      .then((res) => {
        console.log(res);
        const plant = res.data;
        this.setState({ address: plant.address });
      });
  }

  render() {
    // const style = { width: 600, height: 500, marginLeft: 'auto', marginRight: 'auto' };
    const style = { marginTop: '50px', marginLeft: 'auto', marginRight: 'auto' };
    const { viewport } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root} style={style}>
        <Grid container spacing={24}>
          <Grid item xs>
            {/* <Paper className={classes.paper}>xs</Paper> */}
            <PlantBar allPlants={this.props.allPlants} />
          </Grid>
          <Grid item xs>
            {/* <Paper className={classes.paper}>xs</Paper> */}
            <MapView viewport={viewport} onViewportChange={this.onViewportChange} allPlants={this.props.allPlants} />
          </Grid>
        </Grid>
          <div>
            <Fab component={Link} to="/submitPlant" color="primary" size="medium" variant="extended" aria-label="Add a Plant" className={classes.fab} styles={styles.fab}>
          Add a Plant
            </Fab>
          </div>
      </div>
      // <div>
      //   <div>Hello World</div><br />
      //   <div
      //     // id="map"
      //     // style={style}
      //   /> /// 
      //   <MapView viewport={viewport} onViewportChange={this.onViewportChange} allPlants={this.props.allPlants} />
      // </div>
    );
  }
}

MapViewContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapViewContainer);

// export default MapViewContainer;
