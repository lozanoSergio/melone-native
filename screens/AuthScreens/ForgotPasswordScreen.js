import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderNavigation} from '../../components/common/HeaderNavigation';
import {ForgotPasswordContainer} from '../../components/containers/auth/ForgotPasswordContainer';
import {ArrowBackIconOutline} from '../../assets/icons';
import {sendResetPasswordResetEmail} from '../../services/authActions';

class ForgotPasswordScreen extends Component {
  state = {
    error: undefined,
    laoding: false,
    success: false,
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  passWordReset = email => {
    this.setState({loading: true, error: undefined, success: false});
    sendResetPasswordResetEmail(email)
      .then(result => {
        this.setState({loading: false, success: true});
      })
      .catch(error => this.setState({error, loading: false}));
  };

  render() {
    const {error, loading, success} = this.state;
    return (
      <View style={styles.container}>
        <HeaderNavigation
          transparent
          icon={ArrowBackIconOutline}
          onBackPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <ForgotPasswordContainer
          goBack={this.goBack}
          onResetPress={this.passWordReset}
          error={error}
          loading={loading}
          success={success}
        />
      </View>
    );
  }
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
