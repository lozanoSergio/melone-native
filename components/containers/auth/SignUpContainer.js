import React from 'react';
import {View, Image, Dimensions, Platform} from 'react-native';
import {Button, withStyles} from 'react-native-ui-kitten';
import {ScrollableAvoidKeyboard} from '../../common/ScrollableAvoidKeyboard';
import {SignUpForm} from '../../forms/auth/SignUpForm';
import {textStyle} from '../../common/style';
import {SocialAuthForm} from '../../forms/auth/SocialAuthForm';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

class SignUpComponent extends React.Component {
  state = {
    formData: undefined,
  };

  onSignInButtonPress = () => {
    this.props.goBack();
  };

  onSignUpButtonPress = values => {
    this.props.onSignUpButton(values);
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

  keyboardOffset = Platform.select({
    ios: 0,
    android: 40,
  });

  render() {
    const {themedStyle, error, loading} = this.props;
    return (
      <ScrollableAvoidKeyboard
        style={themedStyle.container}
        //extraScrollHeight={this.keyboardOffset}
      >
        <View style={themedStyle.heightContainer}>
          <View style={themedStyle.headerContainer}>
            <Image
              source={require('../../../assets/images/illustrations/undraw_eating_together_tjhx.png')}
              style={themedStyle.imageHeader}
              resizeMode="contain"
            />
          </View>
          <SignUpForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
            error={error}
          />
          <Button
            style={themedStyle.signUpButton}
            textStyle={textStyle.button}
            size="giant"
            disabled={!this.state.formData || loading}
            onPress={() => this.onSignUpButtonPress(this.state.formData)}>
            REGISTRARSE
          </Button>
          <View style={themedStyle.socialAuthContainer}>
            <SocialAuthForm
              hint="O utiliza tu red social favorita"
              iconStyle={themedStyle.socialAuthIcon}
              onGooglePress={this.onGoogleButtonPress}
              onFacebookPress={this.onFacebookButtonPress}
              onTwitterPress={this.onTwitterButtonPress}
            />
          </View>
          <View style={themedStyle.signInButton}>
            <Button
              textStyle={themedStyle.signUpText}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={this.onSignInButtonPress}>
              ¿Ya tienes cuenta? Inicia Sesión
            </Button>
          </View>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignUpContainer = withStyles(SignUpComponent, theme => {
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
    imageHeader: {
      width: maxWidth,
      height: maxHeight / 6,
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
      flex: 0.5,
      justifyContent: 'flex-end',
    },
    signUpButton: {
      marginHorizontal: 16,
    },
    signUpText: {
      color: theme['text-hint-color'],
      ...textStyle.subtitle,
    },
  };
});
