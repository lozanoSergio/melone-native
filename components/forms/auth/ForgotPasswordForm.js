import React from 'react';
import {View} from 'react-native';
import {withStyles, Text} from 'react-native-ui-kitten';
import {ValidationInput, textStyle} from '../../common';
import {EmailValidator} from '../../../core/validators';
import {Icon} from '../../UI/Icons';

class ForgotPasswordFormComponent extends React.Component {
  state = {
    email: undefined,
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

  isValid = value => {
    const {email} = value;
    return email !== undefined;
  };

  renderEmailIcon = () => {
    return <Icon name="mail" type="feather" size={24} color="#D4E0F6" />;
  };

  render() {
    const {
      error,
      success,
      loading,
      style,
      themedStyle,
      ...restProps
    } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          textStyle={textStyle.paragraph}
          placeholder="Email"
          icon={this.renderEmailIcon}
          validator={EmailValidator}
          error={error}
          onChangeText={this.onEmailInputTextChange}
        />
        {error ? (
          <Text
            style={themedStyle.enterEmailLabel}
            appearance="hint"
            category="p2"
            status="danger">
            Lo sentimos, no hemos podido encontrar ese email.
          </Text>
        ) : success ? (
          <Text
            style={themedStyle.enterEmailLabel}
            appearance="hint"
            category="p2"
            status="success">
            Te hemos enviado un email con un link para que puedas recuperar tu
            contraseña. Si no aparece en unos minutos, porfavor comprueba tu
            email.
          </Text>
        ) : loading ? null : (
          <Text
            style={themedStyle.enterEmailLabel}
            appearance="hint"
            category="p2">
            Si has olvidado tu contraseña introduce el email con el que te
            registraste.
          </Text>
        )}
      </View>
    );
  }
}

export const ForgotPasswordForm = withStyles(
  ForgotPasswordFormComponent,
  theme => ({
    container: {},
    enterEmailLabel: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      marginBottom: 42,
      //...textStyle.subtitle
    },
  }),
);
