import React from 'react';
import {View, Image, Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Button, Text, withStyles} from 'react-native-ui-kitten';
import {CreateUserForm} from '../../forms/welcome/CreateUserForm';
import {ScrollableAvoidKeyboard, textStyle} from '../../common';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height / 3;

const hasNotch = DeviceInfo.hasNotchSync();

class CreateUsernameContainerComponent extends React.Component {
  state = {
    formData: undefined,
  };

  onFormDataChange = formData => {
    this.setState({formData});
  };

  onCreateUsernameButtonPress = username => {
    this.props.onCreatePress(username);
  };

  render() {
    const {themedStyle, error, loading} = this.props;
    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <View style={themedStyle.headerContainer}>
          <Image
            source={require('../../../assets/images/illustrations/cloud.png')}
            style={themedStyle.image}
            resizeMode="cover"
          />
        </View>
        <Text style={themedStyle.headline} category="h1">
          Bienvenido a {'\n'}Melone
        </Text>
        <Text style={themedStyle.subtitle} appearance="hint" category="p1">
          Añade un nombre para que todo el mundo pueda saber quien eres.
        </Text>
        <View style={themedStyle.createUserForm}>
          <CreateUserForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
            error={error}
            loading={loading}
          />

          <Button
            style={themedStyle.resetButton}
            textStyle={textStyle.button}
            size={maxWidth <= 380 ? 'large' : 'giant'}
            disabled={!this.state.formData || loading}
            onPress={() =>
              this.onCreateUsernameButtonPress(this.state.formData)
            }>
            CONTINUAR
          </Button>
        </View>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const CreateUsernameContainer = withStyles(
  CreateUsernameContainerComponent,
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-2'],
    },
    headline: {
      ...textStyle.headline,
      paddingHorizontal: 16,
      marginTop: 42,
    },
    subtitle: {
      paddingHorizontal: 16,
      marginTop: 8,
      width: maxWidth - maxWidth / 3,
    },
    headerContainer: {
      position: 'absolute',
      top: 20,
      left: 0,
      width: '100%',
      height: '100%',
    },
    image: {
      width: maxWidth,
      height: maxHeight,
    },
    formContainer: {
      flex: 1,
    },
    createUserForm: {
      paddingHorizontal: 16,
      marginTop: Platform.OS === 'ios' && hasNotch ? 32 : 82,
    },
    resetButton: {
      paddingHorizontal: 16,
      marginVertical: 8,
    },
  }),
);
