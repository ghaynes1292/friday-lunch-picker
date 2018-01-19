import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class RecommendationList extends Component {
  render() {
    const { user, current } = this.props;
    return <Grid item xs={4}>
      <Typography type="subheading" gutterBottom>
        {current ? 'Your' : user && user.name} recommendations
      </Typography>
      {user && user.recommendations && user.recommendations.map((rec) =>
        <div key={rec}>{rec}</div>
      )}
    </Grid>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
