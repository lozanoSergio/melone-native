import React from 'react';
import {View} from 'react-native';
import {Button, Avatar, withStyles} from 'react-native-ui-kitten';
import {CameraIconFill} from '../../assets/icons';

class ProfilePhotoComponent extends React.Component {
  render() {
    const {style, themedStyle, onPhotoButtonPress, ...restProps} = this.props;

    return (
      <View style={style}>
        <Avatar style={[style, themedStyle.avatar]} {...restProps} />
        <Button
          style={themedStyle.photoButton}
          size="small"
          activeOpacity={0.95}
          icon={CameraIconFill}
          onPress={onPhotoButtonPress}
        />
      </View>
    );
  }
}

export const ProfilePhoto = withStyles(ProfilePhotoComponent, theme => ({
  avatar: {
    alignSelf: 'center',
  },
  photoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: 48,
    backgroundColor: theme['color-primary-default'],
    position: 'absolute',
    alignSelf: 'flex-end',
  },
}));
