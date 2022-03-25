import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Button, withStyles} from 'react-native-ui-kitten';
import {ForgotPasswordForm} from '../../forms/auth/ForgotPasswordForm';
import {ScrollableAvoidKeyboard, textStyle} from '../../common';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height / 3;

class ForgotPasswordContainerComponent extends React.Component {
  state = {
    formData: undefined,
  };

  onFormDataChange = formData => {
    this.setState({formData});
  };

  onResetPasswordButtonPress = email => {
    this.props.onResetPress(email);
  };

  render() {
    const {themedStyle, error, success, loading, goBack} = this.props;
    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <View style={themedStyle.headerContainer}>
          <Image
            source={require('../../../assets/images/illustrations/undraw_different_love_a3rg.png')}
            style={themedStyle.image}
            resizeMode="contain"
          />
        </View>
        <View style={{paddingHorizontal: 16}}>
          <ForgotPasswordForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
            error={error}
            loading={loading}
            success={success}
          />
          {success ? (
            <Button
              style={themedStyle.resetButton}
              textStyle={textStyle.button}
              size={maxWidth <= 380 ? 'large' : 'giant'}
              onPress={() => goBack()}>
              VOLVER
            </Button>
          ) : (
            <Button
              style={themedStyle.resetButton}
              textStyle={textStyle.button}
              size={maxWidth <= 380 ? 'large' : 'giant'}
              disabled={!this.state.formData || loading}
              onPress={() =>
                this.onResetPasswordButtonPress(this.state.formData)
              }>
              RECUPERAR CONTRASEÑA
            </Button>
          )}
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const ForgotPasswordContainer = withStyles(
  ForgotPasswordContainerComponent,
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-2'],
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: maxHeight,
      paddingVertical: 0,
      backgroundColor: theme['background-basic-color-2'],
    },
    image: {
      width: maxWidth,
      height: maxHeight,
    },
    formContainer: {
      flex: 1,
    },
    forgotPasswordLabel: {
      alignSelf: 'center',
      marginTop: 24,
      ...textStyle.headline,
    },
    resetButton: {
      paddingHorizontal: 16,
    },
  }),
);
