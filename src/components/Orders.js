import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import MoodBad from 'material-ui-icons/MoodBad';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Orders extends Component {
  render() {
    const { classes, size, orders } = this.props;
    return <Grid item xs={size}>
      <Typography type="subheading" gutterBottom>
        Orders
      </Typography>
      <List className={classes.root} dense>
        {orders && orders.map((order) =>
          <ListItem
            key={order.id}>
            <ListItemText inset primary={order.order} />
          </ListItem>
        )}
        {orders.length === 0 && <ListItem>
          <ListItemText inset primary='No Orders yet!' />
            <ListItemIcon>
              <MoodBad />
            </ListItemIcon>
        </ListItem>}
      </List>
    </Grid>
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Orders);
