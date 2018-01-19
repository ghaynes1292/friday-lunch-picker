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
    const { heading, recommendations, size = 4 } = this.props;
    return <Grid item xs={size}>
      <Typography type="subheading" gutterBottom>
        {heading}
      </Typography>
      {recommendations && recommendations.map((rec) =>
        <div key={rec.name}>{rec.name}</div>
      )}
      {!recommendations && <div>
        No recommendations yet!
      </div>}
    </Grid>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
