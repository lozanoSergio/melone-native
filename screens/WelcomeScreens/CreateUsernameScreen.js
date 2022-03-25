import React, {Component} from 'react';
import DeviceInfo from 'react-native-device-info';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import {CreateUsernameContainer} from '../../components/containers/welcome/CreateUsernameContainer';
import {createUsername} from '../../services/authActions';

const hasNotch = DeviceInfo.hasNotchSync();

class CreateUsernameScreen extends Component {
  state = {
    error: undefined,
    laoding: false,
  };

  onCreatePress = username => {
    this.setState({loading: true, error: undefined, success: false});
    createUsername(username)
      .then(result => {
        this.props.navigation.navigate('Dashboard');
      })
      .catch(error => this.setState({error, loading: false}));
  };

  render() {
    const {error, loading, success} = this.state;
    return (
      <View style={styles.container}>
        <CreateUsernameContainer
          goBack={this.goBack}
          onCreatePress={this.onCreatePress}
          error={error}
          loading={loading}
        />
      </View>
    );
  }
}

export default CreateUsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: Platform.select({
      ios: Platform.OS === 'ios' && hasNotch ? 42 : 0,
      android: StatusBar.currentHeight,
    }),
  },
});
