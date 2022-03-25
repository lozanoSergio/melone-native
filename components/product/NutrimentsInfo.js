import React, {Component} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {withStyles, Text, Layout} from 'react-native-ui-kitten';
import {NutrimentCardList} from './nutrimentsList/NutrimentsCardList';
import {textStyle} from '../common/style';
import {NutrientsChart} from './nutrimentsList/NutrientsChart';
import {AdditivesList} from './additiveList/AdditivesList';
import {IngredientsTags} from './ingredients/IngredientsTags';
import {OverviewCard} from './overview/OverviewCard';

const deviceWidth = Dimensions.get('window').width;

class NutrimentInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutrients: [
        {
          label: 'Proteínas',
          value: 0,
          type: 'proteins',
          color: 'rgb(0, 206, 106)',
        },
        {
          label: 'Hidratos de carbono',
          value: 0,
          type: 'carbohydrates',
          color: 'rgb(140, 83, 255)',
        },
        {
          label: 'Grasas',
          value: 0,
          type: 'fat',
          color: 'rgb(64, 124, 255)',
        },
        {
          label: 'Grasas saturadas',
          value: 0,
          type: 'saturated_fat',
          color: 'rgb(255, 183, 0)',
        },
        {
          label: 'Sal',
          value: 0,
          type: 'salt',
          color: 'rgb(255, 183, 0)',
        },
        {
          label: 'Fibra',
          value: 0,
          type: 'fiber',
          color: 'rgb(0, 224, 139)',
        },
        {
          label: 'Azúcares',
          value: 0,
          type: 'sugars',
          color: 'rgb(233, 30, 99)',
        },
      ],
      nutrientsCards: [
        {
          label: 'Calorias',
          value: 0,
          type: 'calories',
          color: 'rgb(64, 124, 255)',
        },
        {
          label: 'Grasas saturadas',
          value: 0,
          type: 'saturated_fat',
          color: 'rgb(255, 183, 0)',
        },
        {
          label: 'Sal',
          value: 0,
          type: 'salt',
          color: 'rgb(255, 183, 0)',
        },
        {
          label: 'Azúcares',
          value: 0,
          type: 'sugars',
          color: 'rgb(233, 30, 99)',
        },
      ],
      ingredientsTags: [],
      additives: [],
      additivesCount: {
        low: 0,
        moderate: 0,
        high: 0,
      },
      ingredientsCount: 0,
      process: {
        title: 'Producto sin clasificar',
        subtitle: undefined,
        novaScore: 0,
        color: '#edf0f4',
      },
    };
  }

  render() {
    const {themedStyle, product} = this.props;
    if (!product) {
      return <></>;
    }

    return (
      <ScrollView style={themedStyle.container}>
        <OverviewCard
          image={product.image}
          ingredientsTags={product.tags}
          process={product.novaScore}
          allergens={product.allergensCount}
          additives={product.additives}
        />
        <NutrimentCardList
          contentContainerStyle={themedStyle.cardContainer}
          data={product.cards}
          energyUnit={product.energyUnit}
        />
        <Text
          style={[textStyle.subtitle, themedStyle.categoryTitle]}
          category="h4">
          {`Información nutricional`}
        </Text>
        <NutrientsChart values={product.nutrients} deviceWidth={deviceWidth} />

        <Layout style={themedStyle.container}>
          <Layout style={themedStyle.container}>
            <Text
              style={[textStyle.subtitle, themedStyle.categoryTitle]}
              category="h4">
              {`Ingredientes & Alergenos`}
            </Text>
            <Layout style={themedStyle.categorySubtitleContainer}>
              <Text
                category="s1"
                appearance="hint"
                style={themedStyle.categorySubtitle}>
                {`${product.ingredientsCount} Ingredientes`}
              </Text>
              {product.allergensCount > 0 ? (
                <Text
                  status="warning"
                  category="s1"
                  appearance="hint"
                  style={themedStyle.categorySubtitle}>
                  {`${product.allergensCount} Alergenos`}
                </Text>
              ) : (
                <Text
                  category="s1"
                  appearance="hint"
                  style={themedStyle.categorySubtitle}>
                  {`${product.allergensCount} Alergenos`}
                </Text>
              )}
            </Layout>
          </Layout>
          <Text
            appearance="hint"
            style={[
              {
                paddingHorizontal: 16,
                paddingVertical: product.ingredientsText ? 8 : 0,
              },
            ]}>
            {product.ingredientsText}
          </Text>
          <IngredientsTags
            style={{paddingHorizontal: 16}}
            data={product.tags}
          />
        </Layout>

        <Layout style={themedStyle.container}>
          <Layout
            style={[
              themedStyle.container,
              {marginTop: product.tags.length !== 0 ? 42 : 34},
            ]}>
            <Text
              style={[textStyle.subtitle, themedStyle.categoryTitle]}
              category="h4">
              Aditivos
            </Text>
          </Layout>
          <Layout style={themedStyle.categorySubtitleContainer}>
            <Text
              status="success"
              category="s1"
              style={themedStyle.categorySubtitle}>
              {`${product.additives.additivesCount.low} Sin riesgo`}
            </Text>

            <Text
              status="warning"
              category="s1"
              style={themedStyle.categorySubtitle}>
              {`${product.additives.additivesCount.moderate} Riesgo moderado`}
            </Text>

            <Text
              status="danger"
              category="s1"
              style={themedStyle.categorySubtitle}>
              {`${product.additives.additivesCount.high} Riesgo alto`}
            </Text>
          </Layout>

          <AdditivesList
            data={product.additives.filteredAdditives}
            style={themedStyle.additivesContainer}
          />
        </Layout>
      </ScrollView>
    );
  }
}

export const NutrimentInfo = withStyles(NutrimentInfoComponent, theme => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme['background-basic-color-2'],
  },
  categoryTitle: {
    paddingHorizontal: 16,
    color: '#1b2955',
  },
  categorySubtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: theme['background-basic-color-2'],
    paddingHorizontal: 16,
  },
  categorySubtitle: {
    marginRight: 16,
  },
  additivesContainer: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  cardContainer: {
    paddingVertical: 42,
    paddingHorizontal: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
