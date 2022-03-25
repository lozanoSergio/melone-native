import React, {PureComponent} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text, ListItem, withStyles} from 'react-native-ui-kitten';
import {ThemeContext} from '../../core/themes';
import {textStyle} from '../common';
import {CloseIconOutline} from '../../assets/icons';
import moment from 'moment';
import 'moment/locale/es';

class ProductHistoryComponent extends PureComponent {
  state = {
    date: undefined,
  };

  onRemoveProduct = () => {
    this.props.onRemoveProduct(this.props.index, this.props.product);
  };

  renderCloseIcon = () => {
    const {themedStyle} = this.props;
    return CloseIconOutline(themedStyle.closeIcon);
  };

  onItemPress = () => {
    this.props.onItemPress(this.props.product.code);
  };

  updateDate = date => {
    let formatted = moment(date).fromNow();
    moment.locale('es');
    return formatted;
  };

  render() {
    const {themedStyle, style, product, ...restProps} = this.props;
    const {date} = this.state;

    return (
      <ThemeContext.Consumer>
        {({currentTheme}) => (
          <ListItem onPress={this.onItemPress} {...restProps} style={style}>
            <View style={[themedStyle.container]}>
              {product.image ? (
                <Image
                  style={themedStyle.image}
                  resizeMode="contain"
                  source={{
                    uri: product.image,
                  }}
                />
              ) : (
                <Image
                  style={{width: 80, height: null, marginHorizontal: 32}}
                  resizeMode="contain"
                  source={require('../../assets/images/logo_gray.png')}
                />
              )}

              <TouchableOpacity
                style={themedStyle.closeButton}
                activeOpacity={0.9}
                onPress={this.onRemoveProduct}>
                {this.renderCloseIcon()}
              </TouchableOpacity>

              <View style={themedStyle.infoContainer}>
                <Text
                  style={[themedStyle.nameLabel, themedStyle.labelMargin]}
                  category="s1"
                  numberOfLines={1}>
                  {product.name}
                </Text>
                <Text
                  style={[themedStyle.typeLabel, themedStyle.labelMargin]}
                  appearance="hint"
                  category="c1">
                  {product.times_scanned <= 1
                    ? `Escaneado ${product.times_scanned} vez`
                    : `Escaneado ${product.times_scanned} veces`}
                </Text>
                <Text
                  style={[themedStyle.typeLabel, themedStyle.labelMargin]}
                  appearance="hint"
                  category="c1">
                  {`Visto ${this.updateDate(product.last_scan)}`}
                </Text>
              </View>
            </View>
          </ListItem>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export const ProductHistoryListItem = withStyles(
  ProductHistoryComponent,
  theme => ({
    container: {
      flexDirection: 'row',
    },
    image: {
      width: 144,
      height: null,
    },
    infoContainer: {
      flex: 1,
      padding: 16,
      marginRight: 24,
    },
    closeIcon: {
      width: 20,
      height: 20,
      position: 'absolute',
      alignSelf: 'center',
      tintColor: theme['text-hint-color'],
      top: 8,
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 20,
      height: 20,
      padding: 16,
    },
    labelMargin: {
      marginBottom: 4,
    },
    nameLabel: textStyle.subtitle,
    typeLabel: textStyle.paragraph,
  }),
);
