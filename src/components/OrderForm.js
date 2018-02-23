import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class OrderForm extends Component {
  render() {
    const { classes, orderText, onChange } = this.props;
    return <TextField
      multiline
      rows="4"
      helperText="Order"
      value={orderText}
      onChange={onChange}
      className={classes.textField}
      margin="normal"
    />
  }
}

OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderForm);
