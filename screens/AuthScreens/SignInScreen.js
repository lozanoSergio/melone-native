import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  signInWithEmail,
  signInWithTwitter,
  signInWithFacebook,
  signInWithGoogle,
} from '../../services/authActions';
import {SignInContainer} from '../../components/containers/auth/SignInContainer';

class SignInScreen extends Component {
  state = {
    error: undefined,
    laoding: false,
    loginLoader: false,
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

  onSignInButton = values => {
    this.setState({loading: true, error: undefined});
    signInWithEmail(values).catch(error => {
      console.log(error);
      this.setState({error, loading: false});
    });
  };

  onSignUpButton = () => {
    this.props.navigation.navigate('SignUp');
  };

  onForgotPasswordButton = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    const {error, loading} = this.state;
    return (
      <View style={styles.container}>
        <SignInContainer
          googleSignIn={() => this.googleSignIn()}
          facebookSignIn={() => this.facebookSignIn()}
          twitterSignIn={() => this.twitterSignIn()}
          onSignInButton={this.onSignInButton}
          onSignUpButton={() => this.onSignUpButton()}
          onForgotPasswordButton={() => this.onForgotPasswordButton()}
          error={error}
          loading={loading}
        />
      </View>
    );
  }
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
