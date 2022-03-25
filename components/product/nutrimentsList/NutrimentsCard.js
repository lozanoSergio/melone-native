import React from 'react';
import {withStyles, ListItem, Text, Layout} from 'react-native-ui-kitten';
import {textStyle} from '../../common/style';
import {
  SugarIcon,
  SaltIcon,
  ButterIcon,
  CaloriesIcon,
} from '../../../assets/icons';

class NutrimentCardComponent extends React.Component {
  handleData = data => {
    const {themedStyle} = this.props;

    let percent = Math.round(data.value * 100) / 100;

    const progressValue = percent / 100;

    let roundedPercent =
      data.value > 1 ? Math.round(percent * 10) / 10 : percent;

    if (data.type === 'calories') {
      switch (true) {
        case data.value < 200:
          return {
            label: 'Contenido calórico bajo',
            colors: ['#00ce6a', '#CAFCCF'],
            number: percent,
            numberLabel: `${roundedPercent}`,
            iconName: CaloriesIcon(themedStyle.icon),
          };
        case data.value <= 800:
          return {
            label: 'Contenido calórico medio',
            colors: ['#ffb700', '#FFF6CC'],
            number: percent,
            numberLabel: `${roundedPercent}`,
            iconName: CaloriesIcon(themedStyle.icon),
          };
        case data.value > 800:
          return {
            label: 'Contenido calórico elevado',
            colors: ['#e91e63', '#FDD4D1'],
            number: percent,
            numberLabel: `${roundedPercent}`,
            iconName: CaloriesIcon(themedStyle.icon),
          };
        default:
          return {
            label: 'Contenido calórico indefinido',
            colors: ['#1B2955', '#D4E0F6'],
            number: percent,
            numberLabel: `${roundedPercent}`,
            iconName: CaloriesIcon(themedStyle.icon),
          };
      }
    } else if (data.type === 'salt') {
      switch (true) {
        case data.value < 0.005:
          return {
            label: 'Producto sin sal',
            colors: ['#00ce6a', '#CAFCCF'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
        case data.value < 0.04:
          return {
            label: 'Muy bajo contenido en sal',
            colors: ['#00ce6a', '#CAFCCF'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
        case data.value < 0.12:
          return {
            label: 'Producto sin sal añadida',
            colors: ['#00ce6a', '#CAFCCF'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
        case data.value <= 1.5:
          return {
            label: 'Cantidad de sal moderada',
            colors: ['#ffb700', '#FFF6CC'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
        case data.value > 1.5:
          return {
            label: 'Alta cantidad de sal',
            colors: ['#e91e63', '#FDD4D1'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
        default:
          return {
            label: 'Cantidad de sal indefinido',
            colors: ['#1B2955', '#D4E0F6'],
            number: percent,
            numberLabel: `${roundedPercent}g`,
            progressValue: progressValue,
            iconName: SaltIcon(themedStyle.icon),
          };
      }
    } else if (data.type === 'saturated_fat') {
      switch (true) {
        case data.value < 1.5:
          return {
            label: 'Grasas saturadas bajas',
            colors: ['#00ce6a', '#CAFCCF'],
            number: 10,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: ButterIcon(themedStyle.icon),
          };
        case data.value <= 5:
          return {
            label: 'Grasas saturadas moderadas',
            colors: ['#ffb700', '#FFF6CC'],
            number: 40,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: ButterIcon(themedStyle.icon),
          };
        case data.value > 5:
          return {
            label: 'Grasas saturadas elevadas',
            colors: ['#e91e63', '#FDD4D1'],
            number: data.value * 10,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: ButterIcon(themedStyle.icon),
          };
        default:
          return {
            label: 'Grasas saturadas indefinidas',
            colors: ['#1B2955', '#D4E0F6'],
            number: percent,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: ButterIcon(themedStyle.icon),
          };
      }
    } else if (data.type === 'sugars') {
      switch (true) {
        case data.value < 5:
          return {
            label: 'Nivel de azúcar bajo',
            colors: ['#00ce6a', '#CAFCCF'],
            number: percent,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: SugarIcon(themedStyle.icon),
          };
        case data.value <= 22.5:
          return {
            label: 'Nivel de azúcar moderado',
            colors: ['#ffb700', '#FFF6CC'],
            number: percent,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: SugarIcon(themedStyle.icon),
          };
        case data.value > 22.5:
          return {
            label: 'Nivel de azúcar elevado',
            colors: ['#e91e63', '#FDD4D1'],
            number: percent,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: SugarIcon(themedStyle.icon),
          };
        default:
          return {
            label: 'Cantidad de azúcar indefinido',
            colors: ['#1B2955', '#D4E0F6'],
            number: percent,
            numberLabel: `${roundedPercent}%`,
            progressValue: progressValue,
            iconName: SugarIcon(themedStyle.icon),
          };
      }
    } else {
      return null;
    }
  };

  render() {
    const {
      style,
      themedStyle,
      data,
      energyUnit,
      deviceWidth,
      ...restProps
    } = this.props;

    const dataToShow = this.handleData(data);
    let textCategory = 'h4';

    if (deviceWidth <= 375) {
      textCategory = 'h6';
    }

    if (!dataToShow) {
      return null;
    }

    return (
      <ListItem {...restProps} style={[themedStyle.container, style]}>
        {data.type !== 'calories' ? (
          <Layout style={themedStyle.cardContainer}>
            <Text style={textStyle.subtitle} category={textCategory}>
              {dataToShow.numberLabel}
            </Text>
            {dataToShow.iconName}
          </Layout>
        ) : (
          <Layout style={themedStyle.cardContainer}>
            <Text style={{paddingTop: 10, height: 40}}>
              <Text style={[textStyle.subtitle]} category={textCategory}>
                {dataToShow.numberLabel}
              </Text>
              <Text
                style={[textStyle.subtitle]}
                category="s1"
                appearance="hint">
                {energyUnit}
              </Text>
            </Text>
            {dataToShow.iconName}
          </Layout>
        )}
        <Text style={[textStyle.subtitle, {marginVertical: 8}]} category="c2">
          {dataToShow.label}
        </Text>
      </ListItem>
    );
  }
}

export const NutrimentCard = withStyles(NutrimentCardComponent, theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 12,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme['background-basic-color-1'],
    marginTop: 16,
  },
  icon: {
    width: 42,
    height: 42,
  },
}));
