import React from 'react';
import {Text, withStyles, Layout} from 'react-native-ui-kitten';
import {Chip} from '../../common/Chip';

class IngredientsTagsComponent extends React.Component {
  render() {
    const {themedStyle, style, data} = this.props;
    return (
      <Layout style={[themedStyle.container, style]}>
        {data &&
          data.map((chip, i) => (
            <Chip key={i} style={themedStyle.chipContainer} color={chip.color}>
              <Layout
                style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                <Text
                  style={{fontSize: 14}}
                  category="label"
                  appearance="alternative">
                  {chip.label}
                </Text>
              </Layout>
            </Chip>
          ))}
      </Layout>
    );
  }
}

export const IngredientsTags = withStyles(IngredientsTagsComponent, theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: theme['background-basic-color-2'],
  },
  chipContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginVertical: 8,
  },
  label: {
    color: 'white',
  },
}));
