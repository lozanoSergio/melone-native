import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {getVersionSync} from 'react-native-device-info';
import {Sae} from 'react-native-textinput-effects';
import {View, Image} from 'react-native';
import {Button, Text, withStyles} from 'react-native-ui-kitten';
import {ProfileSetting, ProfilePhoto} from '../../profile';
import {ContainerView, textStyle} from '../../common';

class ProfileSettingsComponent extends React.Component {
  state = {
    editUsername: false,
    inputValue: '',
    displayName: this.props.profile.displayName,
  };

  onCloseSessionPress = () => {
    this.props.onCloseSessionPress();
  };

  onPhotoButtonPress = () => {
    this.props.onPhotoButtonPress();
  };

  getAppVersion = () => {
    const version = getVersionSync();
    return <Text appearance="hint">{`Versión: ${version}`}</Text>;
  };

  endEditing = () => {
    const {inputValue, displayName} = this.state;
    if (inputValue !== '' && inputValue !== displayName) {
      this.setState({displayName: inputValue});
      this.props.onEditUserAction(inputValue);
    }
    this.setState({inputValue: ''});
  };

  onInputValueChange = inputValue => {
    this.setState({inputValue});
  };

  render() {
    const {themedStyle, profile} = this.props;
    const {inputValue, displayName} = this.state;

    return (
      <ContainerView style={themedStyle.container}>
        <View style={themedStyle.photoSection}>
          <ProfilePhoto
            style={themedStyle.photo}
            source={
              profile.photoURL
                ? {uri: profile.photoURL}
                : require('../../../assets/images/user.png')
            }
            onPhotoButtonPress={this.onPhotoButtonPress}
          />
          <View style={themedStyle.nameSection}>
            <Sae
              label={displayName}
              iconClass={Feather}
              iconName={'edit'}
              iconColor={themedStyle.inputIcon.color}
              inputPadding={16}
              labelHeight={24}
              borderHeight={2}
              value={inputValue}
              onChangeText={inputValue => this.setState({inputValue})}
              onEndEditing={this.endEditing}
              inputStyle={themedStyle.inputStyle}
              labelStyle={themedStyle.inputLabel}
              numberOfLines={1}
              autoCapitalize={'none'}
              autoCorrect={false}
            />

            <ProfileSetting
              style={[
                themedStyle.profileSetting,
                themedStyle.nameParameter,
                themedStyle.lastNameParameter,
              ]}
              hint
              value={`@${profile.username}`}
            />
          </View>
        </View>
        <View style={themedStyle.descriptionSection}>
          <Text style={themedStyle.description} appearance="hint" category="s1">
            {profile.about}
          </Text>
        </View>
        <View style={themedStyle.infoSection}>
          <ProfileSetting
            style={themedStyle.profileSetting}
            label="Email"
            hint
            value={profile.email}
          />
          {profile.providerId === 'password' && (
            <ProfileSetting
              style={themedStyle.profileSetting}
              label="Contraseña"
              hint
              value="********"
            />
          )}
        </View>
        <Button
          style={themedStyle.button}
          textStyle={textStyle.button}
          status="danger"
          onPress={this.onCloseSessionPress}>
          Cerrar Sesión
        </Button>
        <View style={themedStyle.versionContainer}>
          <Image
            style={{width: 80, height: 60}}
            resizeMode={'contain'}
            source={require('../../../assets/images/icon.png')}
          />
          {this.getAppVersion()}
        </View>
      </ContainerView>
    );
  }
}

export const ProfileSettings = withStyles(ProfileSettingsComponent, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: theme['background-basic-color-1'],
    paddingTop: 80,
  },
  nameSection: {
    flex: 1,
    marginLeft: 32,
  },
  inputIcon: {
    color: theme['color-primary-default'],
  },
  inputStyle: {
    ...textStyle.label,
    fontSize: 14,
  },
  inputLabel: {
    ...textStyle.label,
  },
  descriptionSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  nameParameter: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  lastNameParameter: {
    marginVertical: 16,
  },
  description: {
    marginTop: 24,
    ...textStyle.paragraph,
  },
  photo: {
    width: 76,
    height: 76,
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  versionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
}));
