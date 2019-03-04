import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Typography } from '@material-ui/core';
// import tileData from './tileData';
import cities from './cities.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // align: 'center',
    // position: 'center',
    // right: 125,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


class UsersLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPlants: props.likedPlants,
    };
  }

  render() {
    const { classes } = this.props;
    const { likedPlants } = this.state;
    if (likedPlants.length === undefined) {
      return (
        <div>No Likes yet</div>
      );
    }

    return (
      <div>

        <Typography
          variant="h6"
          gutterBottom
        // align="center"
        >
          Here are you favorite Plucks
        </Typography>
        <div className={classes.root} style={{ width: '500px' }}>
          <GridList className={classes.gridList} cols={2.5}>
            {likedPlants.map(tile => (
              <GridListTile key={tile.id}>
                <img src={tile.imagelink} alt={tile.plant} />
                <GridListTileBar
                  title={tile.plant}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={(
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
  )}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

UsersLikes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersLikes);
