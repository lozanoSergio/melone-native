import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderNavigation} from '../../components/common/HeaderNavigation';
import {SignUpContainer} from '../../components/containers/auth/SignUpContainer';
import {Loader} from '../../components/common';
import {ArrowBackIconOutline} from '../../assets/icons';
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signUpWithEmail,
} from '../../services/authActions';

class SignUpScreen extends Component {
  state = {
    error: undefined,
    laoding: false,
    loginLoader: false,
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  googleSignIn = () => {
    signInWithGoogle();
  };

  facebookSignIn = () => {
    signInWithFacebook();
  };

  twitterSignIn = () => {
    signInWithTwitter();
  };

  onSignUpButton = values => {
    this.setState({loading: true, error: undefined});
    signUpWithEmail(values).catch(error =>
      this.setState({error, loading: false}),
    );
  };

  render() {
    const {error, loading, loginLoader} = this.state;
    if (loginLoader) {
      <Loader />;
    }
    return (
      <View style={styles.container}>
        <HeaderNavigation
          transparent
          icon={ArrowBackIconOutline}
          onBackPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <SignUpContainer
          goBack={() => this.goBack()}
          onSignUpButton={this.onSignUpButton}
          googleSignIn={() => this.googleSignIn()}
          facebookSignIn={() => this.facebookSignIn()}
          twitterSignIn={() => this.twitterSignIn()}
          error={error}
          loading={loading}
        />
      </View>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
