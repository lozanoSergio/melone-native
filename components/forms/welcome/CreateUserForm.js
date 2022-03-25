import React from 'react';
import {View} from 'react-native';
import {withStyles, Text} from 'react-native-ui-kitten';
import {ValidationInput, textStyle} from '../../common';
import {NameValidator} from '../../../core/validators';
import {Icon} from '../../UI/Icons';

class CreateUserFormComponent extends React.PureComponent {
  state = {
    username: undefined,
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

  onUsernameInputTextChange = username => {
    this.setState({username});
  };

  isValid = value => {
    const {username} = value;
    return username !== undefined;
  };

  renderUsernameIcon = () => {
    return <Icon name="user" type="feather" size={24} color="#D4E0F6" />;
  };

  render() {
    const {error, loading, style, themedStyle, ...restProps} = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          textStyle={textStyle.paragraph}
          placeholder="Nombre de usuario"
          icon={this.renderUsernameIcon}
          validator={NameValidator}
          error={error}
          onChangeText={this.onUsernameInputTextChange}
        />
        {error && (
          <Text
            style={themedStyle.enterUsernameLabel}
            appearance="hint"
            category="p2"
            status="danger">
            {error}
          </Text>
        )}
      </View>
    );
  }
}

export const CreateUserForm = withStyles(CreateUserFormComponent, theme => ({
  container: {},
  enterEmailLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    marginBottom: 42,
  },
}));
