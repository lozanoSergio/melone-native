import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Button, withStyles} from 'react-native-ui-kitten';
import {ScrollableAvoidKeyboard} from '../../common/ScrollableAvoidKeyboard';
import {SignInForm} from '../../forms/auth/SignInForm';
import {textStyle} from '../../common/style';
import {SocialAuthForm} from '../../forms/auth/SocialAuthForm';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

class SignInComponent extends React.Component {
  state = {
    formData: undefined,
  };

  onSignInButtonPress = values => {
    this.props.onSignInButton(values);
  };

  onSignUpButtonPress = () => {
    this.props.onSignUpButton();
  };

  onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordButton();
  };

  onFormDataChange = formData => {
    this.setState({formData});
  };

  onGoogleButtonPress = () => {
    this.props.googleSignIn();
  };

  onFacebookButtonPress = () => {
    this.props.facebookSignIn();
  };

  onTwitterButtonPress = () => {
    this.props.twitterSignIn();
  };

  render() {
    const {themedStyle, error, loading} = this.props;
    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <View style={themedStyle.heightContainer}>
          <View style={themedStyle.headerContainer}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={themedStyle.image}
              resizeMode="contain"
            />
          </View>
          <SignInForm
            style={themedStyle.formContainer}
            onForgotPasswordPress={this.onForgotPasswordButtonPress}
            onDataChange={this.onFormDataChange}
            error={error}
          />
          <Button
            style={themedStyle.signInButton}
            textStyle={textStyle.button}
            size="giant"
            disabled={!this.state.formData || loading}
            onPress={() => this.onSignInButtonPress(this.state.formData)}>
            ACCEDER
          </Button>
          <View style={themedStyle.socialAuthContainer}>
            <SocialAuthForm
              hint="Inicia sesión con tu red social favorita"
              iconStyle={themedStyle.socialAuthIcon}
              onGooglePress={this.onGoogleButtonPress}
              onFacebookPress={this.onFacebookButtonPress}
              onTwitterPress={this.onTwitterButtonPress}
            />
          </View>
          <View style={themedStyle.signUpButton}>
            <Button
              textStyle={themedStyle.signUpText}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={this.onSignUpButtonPress}>
              ¿No tienes cuenta? Registrate
            </Button>
          </View>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignInContainer = withStyles(SignInComponent, theme => {
  return {
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme['background-basic-color-2'],
    },
    heightContainer: {
      flex: 1,
      height: maxHeight,
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 42,
      backgroundColor: theme['background-basic-color-2'],
    },
    image: {
      width: maxWidth,
      height: maxHeight / 4,
    },
    formContainer: {
      paddingHorizontal: 16,
    },
    socialAuthContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginVertical: 42,
    },
    socialAuthIcon: {
      color: theme['color-primary-500'],
    },
    signInLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    signInButton: {
      marginHorizontal: 16,
    },
    signUpButton: {
      flex: 0.5,
      justifyContent: 'flex-end',
    },
    signUpText: {
      color: theme['text-hint-color'],
      ...textStyle.subtitle,
    },
  };
});
