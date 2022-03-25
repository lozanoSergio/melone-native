import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {withStyles, Text} from 'react-native-ui-kitten';
import {FacebookIcon} from '../../../assets/icons';
import {textStyle} from '../../common/style';

class SocialAuthFormComponent extends React.Component {
  renderCaptionElement = style => {
    const {hint} = this.props;

    return <Text style={style}>{hint}</Text>;
  };

  render() {
    const {themedStyle, hintStyle, iconStyle, hint, ...restProps} = this.props;
    const {buttonContainer, ...componentStyle} = themedStyle;

    return (
      <View {...restProps}>
        {hint
          ? this.renderCaptionElement([componentStyle.hint, hintStyle])
          : null}
        <View style={buttonContainer}>
          <TouchableOpacity
            style={themedStyle.GoogleStyle}
            activeOpacity={0.8}
            onPress={this.props.onGooglePress}>
            <Image
              source={require('../../../assets/icons/flat/g-logo.png')}
              style={themedStyle.ImageIconStyle}
            />

            <Text style={themedStyle.GoogleTextStyle}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themedStyle.FacebookStyle}
            activeOpacity={0.8}
            onPress={this.props.onFacebookPress}>
            {FacebookIcon(themedStyle.ImageFBStyle)}

            <Text style={themedStyle.FBTextStyle}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const SocialAuthForm = withStyles(SocialAuthFormComponent, theme => ({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    alignSelf: 'center',
    marginBottom: 16,
    ...textStyle.subtitle,
  },
  GoogleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    minWidth: 148,
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 42,
    borderRadius: 5,
    margin: 8,
    elevation: 1,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    minWidth: 148,
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
    elevation: 1,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  ImageFBStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    tintColor: '#fff',
  },
  GoogleTextStyle: {
    color: 'rgba(0,0,0,0.54)',
    fontFamily: 'opensans-bold',
    fontWeight: 'bold',
    marginBottom: 4,
    // marginRight: 20,
    marginLeft: 10,
  },
  FBTextStyle: {
    color: '#fff',
    fontFamily: 'opensans-bold',
    fontWeight: 'bold',
    marginBottom: 4,
    marginRight: 20,
  },
}));
