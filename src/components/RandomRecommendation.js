import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class RecommendationList extends Component {
  render() {
    const { rec, getRandomRecommendation } = this.props;
    return <div>
      <Button raised color="accent" onClick={getRandomRecommendation}>
        Get Random Recommendation
      </Button>
      <Typography type="subheading" gutterBottom>
        {rec}
      </Typography>
    </div>
  }
}

RecommendationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecommendationList);
