import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Star from '@material-ui/icons/Star';
import AddCircle from '@material-ui/icons/AddCircle';
import Favorite from '@material-ui/icons/Favorite';
import MoodBad from '@material-ui/icons/MoodBad';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class RecommendationList extends Component {
  renderIcon (rec) {
    const { currentRec }= this.props;
    if (currentRec && rec.name === currentRec.name) {
      return <Star />
    } else {
      return rec.included ? <Favorite /> : <AddCircle />
    }
  }

  renderMegaList () {
    const { classes, recommendations, onAdd, onRemove } = this.props;
    return <List className={classes.root} dense>
      {recommendations && recommendations.map((rec) =>
        <ListItem
          button
          key={rec.name}
          onClick={() => rec.included ? onRemove(rec) : onAdd(rec)}>
          <ListItemText inset primary={rec.name} />
          <ListItemIcon>
            {this.renderIcon(rec)}
          </ListItemIcon>
        </ListItem>
      )}
    </List>;
  }

  renderUserList () {
    const { classes, recommendations, makeRec, currentRec } = this.props;

    return <List className={classes.root} dense>
      {recommendations && recommendations.map((rec) =>
        <ListItem
          button={!!makeRec}
          key={rec.id}
          onClick={() => !!makeRec && makeRec(rec.id)}>
          <ListItemText inset primary={rec.name} />
          {currentRec && rec.name === currentRec.name &&
            <ListItemIcon>
              <Star />
            </ListItemIcon>
          }
        </ListItem>
      )}
      {recommendations.length === 0 && <ListItem>
        <ListItemText inset primary='No Recommendations yet!' />
          <ListItemIcon>
            <MoodBad />
          </ListItemIcon>
      </ListItem>}
    </List>;
  }

  render() {
    const { heading, size, mega, absent } = this.props;
    return <Grid item xs={size}>
      <Typography type="subheading" gutterBottom>
        {heading}{absent && ' (Absent)'}
      </Typography>
      {mega ? this.renderMegaList() : this.renderUserList()}
    </Grid>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
