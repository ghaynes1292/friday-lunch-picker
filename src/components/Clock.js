import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import timer from 'moment-timer'

const styles = {
  textInput: {
    width: '400px'
  }
};

class AddRecommendation extends Component {
  state = {
    currentTime: moment(),
  }

  componentWillMount () {
    new moment.duration(500).timer({ loop: true }, () => this.setState({ currentTime: moment() }));
  }


  render() {
    const { endOfWeek } = this.props;
    const { currentTime } = this.state;

    return <div>
      <div>
        <Typography type="subheading">
          Voting ends {currentTime.to(endOfWeek)}:
        </Typography>
        <Typography type="subheading" gutterBottom>
          {endOfWeek.format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
      </div>
    </div>
  }
}

AddRecommendation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecommendation);
