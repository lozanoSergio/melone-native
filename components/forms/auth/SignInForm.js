import React from 'react';
import {View} from 'react-native';
import {Text, Button, withStyles} from 'react-native-ui-kitten';
import {EmailValidator, PasswordValidator} from '../../../core/validators';
import {textStyle, ValidationInput} from '../../common';
import {Icon} from '../../UI/Icons';

class SignInFormComponent extends React.Component {
  state = {
    email: undefined,
    password: undefined,
  };

  componentDidUpdate(prevProps, prevState) {
    const oldFormValid = this.isValid(prevState);
    const newFormValid = this.isValid(this.state);

    const isStateChanged = this.state !== prevState;
    const becomeValid = !oldFormValid && newFormValid;
    const becomeInvalid = oldFormValid && !newFormValid;
    const remainValid = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  onEmailInputTextChange = email => {
    this.setState({email});
  };

  onPasswordInputTextChange = password => {
    this.setState({password});
  };

  isValid = value => {
    const {email, password} = value;
    return email !== undefined && password !== undefined;
  };

  renderEmailIcon = () => {
    return <Icon name="mail" type="feather" size={24} color="#D4E0F6" />;
  };

  renderEyeIcon = () => {
    return <Icon name="eye-off" type="feather" size={24} color="#D4E0F6" />;
  };

  render() {
    const {
      style,
      themedStyle,
      onForgotPasswordPress,
      error,
      ...restProps
    } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <ValidationInput
            textStyle={textStyle.paragraph}
            placeholder="Email"
            icon={this.renderEmailIcon}
            validator={EmailValidator}
            error={error}
            onChangeText={this.onEmailInputTextChange}
          />
          <ValidationInput
            style={themedStyle.passwordInput}
            textStyle={textStyle.paragraph}
            placeholder="Contraseña"
            icon={this.renderEyeIcon}
            secureTextEntry={true}
            validator={PasswordValidator}
            error={error}
            onChangeText={this.onPasswordInputTextChange}
          />
          {error && (
            <Text
              style={themedStyle.errorTextHint}
              appearance="hint"
              category="p2"
              status="danger">
              {error}
            </Text>
          )}
          <View style={themedStyle.forgotPasswordContainer}>
            <Button
              style={themedStyle.forgotPasswordButton}
              textStyle={themedStyle.forgotPasswordText}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={onForgotPasswordPress}>
              ¿Has olvidado la contraseña?
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export const SignInForm = withStyles(SignInFormComponent, theme => ({
  container: {},
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
    marginVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: theme['text-hint-color'],
    ...textStyle.subtitle,
  },
  errorTextHint: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    marginBottom: 16,
    //...textStyle.subtitle
  },
}));
