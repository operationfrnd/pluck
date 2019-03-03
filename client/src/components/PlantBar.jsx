import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
// import tileData from './tileData';
import cities from './cities.js';

const x = document.getElementById('demo');

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const PlantBar = (props) => {
  const { classes, allPlants } = props;

  const iconClick = (latitude, longitude, plant) => {
    console.log('icon Clicked');
    console.log(latitude, longitude, plant);
  };

  const showPosition = (position) => {
    // this x.innerHTML sends it to the screen and does not remove it from page to page
    // x.innerHTML = 'Latitude: ' + position.coords.latitude +
    // '<br>Longitude: ' + position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude);
  };
  // linebreak isnt working in the temp lit
  // `Latitude: ${position.coords.latitude}
  // Longitude: ${position.coords.longitude}`;

  // gets location of current user https://www.w3schools.com/html/html5_geolocation.asp
  // need to find a way to get cordinates/location in Mapview.
  //    May moved function to MapView component
  const getLocation = () =>  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  };


  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Plucking Good</ListSubheader>
        </GridListTile>
        {allPlants.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.imagelink} alt={tile.plant} />
            <GridListTileBar
              title={tile.plant}
              subtitle={<span>description: {tile.description}</span>}
              actionIcon={(
                <div>
                  <IconButton className={classes.icon}
                    onClick={() => {
                      iconClick(tile.latitude, tile.longitude, tile.plant);
                      getLocation(); // make this work to get location for map
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </div>
              )}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

PlantBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlantBar);