/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import uuid from 'uuid/v4';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import without from 'lodash/without';
import moment from 'moment';
import withRoot from '../components/withRoot';
import RecommendationList from '../components/RecommendationList';
import Clock from '../components/Clock';

import { userSignIn, firebaseAuth, dbUsers, dbRecommendations, firebaseDatabase } from '../util/firebase';
import { getUserRecs, sortRecsByName, convertObjToArray, recsAndUserRecs, getCurrentRec, getSortedRecCount } from '../util/selectors';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: 50,
  },
  center: {
    textAlign: 'center'
  },
  'justifyCenter': {
    justifyContent: 'center',
  },
  masterList: {
    textAlign: 'center',
    top: '0',
    position: 'absolute'
  },
  header: {
    textAlign: 'center',
    marginLeft: '18%',
    [theme.breakpoints.only('xl')]: {
      marginLeft: '15%'
    },
  },
  usersList: {
    textAlign: 'center',
    marginLeft: '20%',
    [theme.breakpoints.only('xl')]: {
      marginLeft: '15%'
    },
  },
});

class Index extends Component {
  state = {
    user: null,
    users: {},
    recommendations: {},
    currentRec: '',
    endOfWeek: moment().endOf('week').subtract(2, 'days').subtract(8.5, 'hours').add(1, 'second')
  };

  componentWillMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        return dbUsers.once('value').then((snapshot) => {
          if (!snapshot.val() || !snapshot.val()[user.uid]) {
            this.setState({
              user: user,
              users: {
                ...snapshot.val(),
                [user.uid]: { name: user.displayName, recommendations: [] }
              },
            })
            firebaseDatabase.ref('users/' + user.uid).set({
              name: user.displayName,
              recommendations: [],
              email: user.email
            });
          } else {
            this.setState({ user: user, users: snapshot.val() })
          }
        });
      }
    });
    dbUsers.on('value', (snapshot) => {
      this.setState({ users: snapshot.val() });
    });
    dbRecommendations.on('value', (snapshot) => {
      this.setState({ recommendations: snapshot.val() });
    });
  }

  handleClick = () => {
    userSignIn()
  };

  handleAddRecommendation (rec) {
    const { users, user } = this.state;
    const userNow = users[user.uid]
    const newRecUuid = uuid();
    const newRec = { name: rec };
    this.setState({
      users: {
        ...users,
        [user.uid]: {
          ...userNow,
          recommendations: userNow.recommendations ? [...userNow.recommendations, rec] : [rec]
        }
      }
    })
    var updates = {};
    updates['/recommendations/' + newRecUuid] = newRec;
    updates['/users/' + user.uid + '/recommendations'] = userNow.recommendations ? [...userNow.recommendations, newRecUuid] : [rec];

    firebaseDatabase.ref().update(updates);
  }

  handleAddExistingRec (rec) {
    const { users, user } = this.state;
    const userNow = users[user.uid];
    this.setState({
      users: {
        ...users,
        [user.uid]: {
          ...userNow,
          recommendations: userNow.recommendations ? [...userNow.recommendations, rec.id] : [rec.id]
        }
      }
    })
    var updates = {};
    updates['/users/' + user.uid + '/recommendations'] = userNow.recommendations ? [...userNow.recommendations, rec.id] : [rec.id];

    firebaseDatabase.ref().update(updates);
  }

  handleRemoveRec (rec) {
    const { users, user } = this.state;
    const userNow = users[user.uid];

    this.setState({
      users: {
        ...users,
        [user.uid]: {
          ...userNow,
          recommendations: without(userNow.recommendations, rec.id)
        }
      }
    })
    var updates = {};
    updates['/users/' + user.uid + '/recommendations'] = without(userNow.recommendations, rec.id);

    firebaseDatabase.ref().update(updates);
  }

  handleMakeRec (rec) {
    const { users, user, endOfWeek } = this.state;
    const userNow = users[user.uid];
    if (endOfWeek < moment()) {
      return;
    }
    this.setState({
      users: {
        ...users,
        [user.uid]: {
          ...userNow,
          currentRecommendation: rec
        }
      }
    })
    var updates = {};
    updates['/users/' + user.uid + '/currentRecommendation'] = rec;

    firebaseDatabase.ref().update(updates);
  }

  handleRandom () {
    const { users } = this.state;
    const allRecs = flatMap(Object.values(users), (o) => o.recommendations)
    this.setState({ currentRec: allRecs[Math.floor(Math.random() * allRecs.length)] })
  }

  renderLoggedIn () {
    const { classes } = this.props;
    const { users, user, recommendations, endOfWeek } = this.state;
    const localUser = users[user.uid];

    return user.email.slice(-13) !== '@moove-it.com'
      ? <Grid container spacing={24} className={classes.root}>
      <Grid item xs={12} className={classes.center}>
        <Typography type="display2" gutterBottom>
          You don't belong here non-moove-it email
        </Typography>
      </Grid>
    </Grid>
      : <Grid container spacing={24} className={classes.root}>
      <Grid item xs={12} className={classes.center}>
        <Typography type="display3" gutterBottom>
          Choose Your Lunch
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.header}>
        <Grid container spacing={24}>
          <Grid item xs={4} className={classes.center}>
            <Typography type="display2" gutterBottom>
              Winner: {get(getSortedRecCount(recommendations, users), '[0].name')}
            </Typography>
            <a href={get(recommendations, `${get(getSortedRecCount(recommendations, users), '[0].id')}.menu`)}>Menu</a>
          </Grid>
          <Grid item xs={3} xl={3} className={classes.center}>
            <Typography type="display1" gutterBottom>
              Scores:
            </Typography>
            {getSortedRecCount(recommendations, users).map(rec => <div key={rec.id}>
              {rec.name}: {rec.currentCount} - {rec.totalCount}
            </div>)}
          </Grid>
          <Grid item xs={3} className={classes.center}>
            <Clock endOfWeek={endOfWeek} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.masterList}>
        <Grid container spacing={24} className={classes.justifyCenter}>
          <RecommendationList
            heading='All Recommendations'
            size={12}
            mega
            recommendations={sortRecsByName(recsAndUserRecs(recommendations, localUser))}
            onAdd={(rec) => { this.handleAddExistingRec(rec) }}
            onRemove={(rec) => { this.handleRemoveRec(rec) }}
            currentRec={getCurrentRec(recommendations, localUser)}
          />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.usersList}>
        <Grid container spacing={24}>
          <RecommendationList
            heading='Your recommendations'
            recommendations={sortRecsByName(convertObjToArray(getUserRecs(recommendations, localUser)))}
            currentRec={getCurrentRec(recommendations, localUser)}
            makeRec={(rec) => { this.handleMakeRec(rec) }}
          />
          {convertObjToArray(users).map((mappedUser) =>
            mappedUser.id !== user.uid && <RecommendationList
              key={mappedUser.id}
              heading={`${get(mappedUser, 'name', 'Something')}'s recommendations`}
              recommendations={sortRecsByName(convertObjToArray(getUserRecs(recommendations, mappedUser)))}
              currentRec={getCurrentRec(recommendations, mappedUser)}
              absent={mappedUser.absent}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  }

  renderLoggedOut () {
    return (
      <div className={this.props.classes.root}>
        <Typography type="display2" gutterBottom>
          Friday Lunch Picker
        </Typography>
        <Typography type="subheading" gutterBottom>
          Login with google
        </Typography>
        <Button raised color="accent" onClick={this.handleClick}>
          Login
        </Button>
      </div>
    );
  }

  render() {
    const { user } = this.state;
    return user
      ? this.renderLoggedIn()
      : this.renderLoggedOut()
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), withWidth())(Index);
