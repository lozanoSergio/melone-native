import React from 'react';
import {withStyles, ListItem, Text} from 'react-native-ui-kitten';
import {textStyle} from '../../common/style';
import {ThemeContext} from '../../../core/themes';

class NutrimentChipComponent extends React.Component {
  renderShowcaseElement = (style, theme) => {
    const showcaseElement = this.props.data.icon(style, theme);

    return React.cloneElement(showcaseElement, {
      style: [style, showcaseElement.props.style],
    });
  };

  render() {
    const {style, themedStyle, data, ...restProps} = this.props;

    return (
      <ThemeContext.Consumer>
        {({currentTheme}) => (
          <ListItem {...restProps} style={[themedStyle.container, style]}>
            {/* {this.renderShowcaseElement(themedStyle.icon, currentTheme)} */}

            <Text style={textStyle.subtitle} category="s2">
              12
            </Text>
          </ListItem>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export const NutrimentChip = withStyles(NutrimentChipComponent, theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 80,
    height: 80,
  },
}));
