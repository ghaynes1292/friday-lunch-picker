import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import timer from 'moment-timer'

const styles = {
  textInput: {
    width: '400px'
  }
};

class AddRecommendation extends Component {
  state = {
    currentTime: moment()
  }


  render() {
    const { classes } = this.props;
    const { currentTime } = this.state;
    const timer = new moment.duration(1000).timer({ loop: true }, () => this.setState({ currentTime: moment() }));
    const eow = moment().endOf('week').subtract(1, 'days').subtract(15, 'hours').add(1, 'second');
    return <div>
      <div><Typography type="subheading" gutterBottom>
          {currentTime.format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
      </div>
      <div>
        <Typography type="subheading" gutterBottom>
          Next pick {currentTime.to(eow)}
        </Typography>
      </div>
      <div>
        <Typography type="subheading" gutterBottom>
          {eow.format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
      </div>
    </div>
  }
}

AddRecommendation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecommendation);
