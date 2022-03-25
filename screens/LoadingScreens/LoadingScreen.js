import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/user/userActions';
import {Loader} from '../../components/common';
import auth from '@react-native-firebase/auth';

const mapState = state => ({
  user: state.user,
});

const actions = {
  getUser,
};

class LoadingScreen extends Component {
  componentDidMount() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        let userData = await this.props.getUser();

        if (userData && userData.username) {
          this.props.navigation.navigate('Dashboard');
        } else {
          this.props.navigation.navigate('Welcome');
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    return <Loader />;
  }
}
export default connect(
  mapState,
  actions,
)(LoadingScreen);
