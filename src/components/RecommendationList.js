import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Star from 'material-ui-icons/Star';
import AddCircle from 'material-ui-icons/AddCircle';
import Favorite from 'material-ui-icons/Favorite';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class RecommendationList extends Component {
  renderIcon (rec) {
    const { currentRec }= this.props;
    if (currentRec && rec.name == currentRec.name) {
      return <Star />
    } else {
      return rec.included ? <Favorite /> : <AddCircle />
    }
  }

  renderMegaList () {
    const { classes, heading, recommendations, size = 4, onAdd, onRemove } = this.props;
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
    const { classes, heading, recommendations, size = 4, makeRec, currentRec } = this.props;

    return <List className={classes.root} dense>
      {recommendations && recommendations.map((rec) =>
        <ListItem
          button={!!makeRec}
          key={rec.id}
          onClick={() => !!makeRec && makeRec(rec.id)}>
          <ListItemText inset primary={rec.name} />
          {!!makeRec &&
            <ListItemIcon>
              {currentRec && rec.name == currentRec.name ? <Star /> : <Favorite />}
            </ListItemIcon>
          }
        </ListItem>
      )}
    </List>;
  }

  renderCurrentRec () {
    const { currentRecText, currentRec } = this.props;
    return <Typography type="subheading" gutterBottom>
      {currentRecText}: {currentRec.name}
    </Typography>
  }

  render() {
    const { classes, heading, recommendations, size = 4, onAdd, mega, currentRec } = this.props;
    return <Grid item xs={size}>
      <Typography type="subheading" gutterBottom>
        {heading}
      </Typography>
      {mega ? this.renderMegaList() : this.renderUserList()}
      {!mega && currentRec && this.renderCurrentRec()}
    </Grid>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
