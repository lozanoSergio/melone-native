import React from 'react';
import {View} from 'react-native';
import {withStyles, Text} from 'react-native-ui-kitten';
import {ValidationInput} from '../../common/ValidationInput';
import {
  EmailValidator,
  NameValidator,
  PasswordValidator,
} from '../../../core/validators';
import {textStyle} from '../../common/style';
import {Icon} from '../../UI/Icons';

class SignUpFormComponent extends React.Component {
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

  onPasswordInputValidationResult = password => {
    this.setState({password});
  };

  isValid = value => {
    const {password, email} = value;

    return password !== undefined && email !== undefined;
  };

  renderUserIcon = () => {
    return <Icon name="user" type="feather" size={24} color="#D4E0F6" />;
  };

  renderEmailIcon = () => {
    return <Icon name="mail" type="feather" size={24} color="#D4E0F6" />;
  };

  renderEyeIcon = () => {
    return <Icon name="eye-off" type="feather" size={24} color="#D4E0F6" />;
  };

  render() {
    const {style, themedStyle, error, ...restProps} = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <ValidationInput
            style={themedStyle.emailInput}
            textStyle={textStyle.paragraph}
            autoCapitalize="none"
            placeholder="Email"
            icon={this.renderEmailIcon}
            validator={EmailValidator}
            error={
              error && error.code !== 'auth/username-already-in-use'
                ? error
                : null
            }
            onChangeText={this.onEmailInputTextChange}
          />
          <ValidationInput
            style={themedStyle.passwordInput}
            textStyle={textStyle.paragraph}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Contraseña"
            icon={this.renderEyeIcon}
            validator={PasswordValidator}
            onChangeText={this.onPasswordInputValidationResult}
          />
          {error && (
            <Text
              style={themedStyle.errorTextHint}
              appearance="hint"
              category="p2"
              status="danger">
              {error.message}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export const SignUpForm = withStyles(SignUpFormComponent, theme => ({
  container: {},
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  usernameInput: {},
  emailInput: {
    marginTop: 16,
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
