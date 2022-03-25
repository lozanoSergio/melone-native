import React from 'react';
import {Image, View} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {textStyle} from '../../common';
import {IngredientsTags} from '../ingredients/IngredientsTags';
import {Icon} from '../../UI/Icons';
import {AllergenIcon, AdditivesIcon} from '../../../assets/icons';

class OverviewCardComponent extends React.Component {
  render() {
    const {
      style,
      themedStyle,
      image,
      allergens,
      additives,
      process,
      ingredientsTags,
      ...restProps
    } = this.props;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        {image ? (
          <Image
            style={themedStyle.image}
            resizeMode="contain"
            source={{
              uri: image,
            }}
          />
        ) : (
          <Image
            style={themedStyle.image}
            resizeMode="contain"
            source={require('../../../assets/images/logo_gray.png')}
          />
        )}
        <View style={themedStyle.detailsContainer}>
          <View>
            <Text
              style={textStyle.caption1}
              category="h6"
              allowFontScaling={false}>
              {process.title}
            </Text>

            {process.subtitle && (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="circle"
                  type="font-awesome"
                  color={process.color}
                  size={14}
                  iconStyle={{marginTop: 4, marginRight: 4}}
                />
                <Text
                  style={textStyle.subtitle}
                  category="s2"
                  allowFontScaling={false}>
                  {process.subtitle}
                </Text>
              </View>
            )}
          </View>
          <View style={themedStyle.iconRow}>
            {allergens >= 1 && AllergenIcon(themedStyle.icon)}
            {additives.additivesCount.state && AdditivesIcon(themedStyle.icon)}
          </View>
          <View>
            <IngredientsTags data={ingredientsTags} />
          </View>
        </View>
      </View>
    );
  }
}

export const OverviewCard = withStyles(OverviewCardComponent, theme => ({
  container: {
    flexDirection: 'row',
    marginTop: 42,
    paddingHorizontal: 16,
  },
  detailsContainer: {
    width: 0,
    marginLeft: 24,
    flexGrow: 1,
  },
  image: {
    width: 120,
    height: 140,
  },
  iconRow: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  icon: {
    width: 42,
    height: 42,
    marginRight: 8,
  },
  titleLabel: textStyle.subtitle,
  authorLabel: {
    marginTop: 4,
    ...textStyle.caption1,
  },
  priceLabel: {
    marginTop: 16,
    ...textStyle.subtitle,
  },
  categoryList: {
    marginVertical: 16,
  },
}));
