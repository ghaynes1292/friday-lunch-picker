import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  textInput: {
    width: '400px'
  }
};

class AddRecommendation extends Component {
  state = {
    value: ''
  }

  handleSubmit (e, value) {
    const { addRecommendation } = this.props;
    e.preventDefault()
    this.setState({ value: '' })
    addRecommendation(value)
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e, value)}>
      <Typography type="subheading" gutterBottom>
        Add you own recommendations:
      </Typography>
      <TextField
        disabled
        id="Recommendation"
        className={classes.textInput}
        label="Recommendation - disbled for now"
        placeholder='Add a new Recommendation'
        value={value}
        onChange={(e) => {
          this.setState({ value: e.target.value })
        }}
        margin="normal"
        fullWidth
      />
    </form>
  }
}

AddRecommendation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecommendation);
