import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Star from 'material-ui-icons/Star';
import AddCircle from 'material-ui-icons/AddCircle';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class RecommendationList extends Component {
  renderMegaList () {
    const { classes, heading, recommendations, size = 4, onClick } = this.props;
    return <List className={classes.root} dense>
      {recommendations && recommendations.map((rec) =>
        <ListItem
          button={!rec.included}
          key={rec.name}
          onClick={() => onClick(rec)}>
          <ListItemText inset primary={rec.name} />
          <ListItemIcon>
            {rec.included ? <Star /> : <AddCircle />}
          </ListItemIcon>
        </ListItem>
      )}
    </List>;
  }

  renderUserList () {
    const { classes, heading, recommendations, size = 4, onClick } = this.props;
    return recommendations.length !== 0
      ? recommendations.map((rec) =>
      <div key={rec.name}>{rec.name}</div>
    )
      : <div>
      No recommendations yet!
    </div>
  }

  render() {
    const { classes, heading, recommendations, size = 4, onClick, mega } = this.props;
    return <Grid item xs={size}>
      <Typography type="subheading" gutterBottom>
        {heading}
      </Typography>
      {mega ? this.renderMegaList() : this.renderUserList()}
    </Grid>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
