import {FETCH_PRODUCT, REMOVE_PRODUCT} from './scannedProductConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import additivesList from '../../core/data/additives';

export const fetchProduct = (itemRef, scanned, callback) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(asyncActionStart());
    fetch(`https://world.openfoodfacts.org/api/v0/product/${itemRef}.json`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 1) {
          const data = responseJson.product;
          const product = prepareProduct(data);

          dispatch({
            type: FETCH_PRODUCT,
            payload: {scannedProduct: product},
          });

          if (scanned) {
            callback(product);
          }

          dispatch(asyncActionFinish());
        } else {
          dispatch({
            type: FETCH_PRODUCT,
            payload: {scannedProduct: {status: 0}},
          });
          dispatch(asyncActionFinish());
        }
      });
  } catch (e) {
    console.log(e);
    dispatch(asyncActionError());
  }
};

export const removeProduct = () => async (dispatch, getState) => {
  dispatch({type: REMOVE_PRODUCT});
};

function nutrientsValues(data) {
  return [
    {
      label: 'Proteínas',
      value: data.nutriments.proteins_100g ? data.nutriments.proteins_100g : 0,
      type: 'proteins',
      color: 'rgb(0, 206, 106)',
    },
    {
      label: 'Hidratos de carbono',
      value: data.nutriments.carbohydrates_100g
        ? data.nutriments.carbohydrates_100g
        : 0,
      type: 'carbohydrates',
      color: 'rgb(140, 83, 255)',
    },
    {
      label: 'Grasas',
      value: data.nutriments.fat_100g ? data.nutriments.fat_100g : 0,
      type: 'fat',
      color: 'rgb(64, 124, 255)',
    },
    {
      label: 'Grasas saturadas',
      value: data.nutriments['saturated-fat_100g']
        ? data.nutriments['saturated-fat_100g']
        : 0,
      type: 'saturated_fat',
      color: 'rgb(255, 183, 0)',
    },
    {
      label: 'Sal',
      value: data.nutriments.salt_100g ? data.nutriments.salt_100g : 0,
      type: 'salt',
      color: 'rgb(255, 183, 0)',
    },
    {
      label: 'Fibra',
      value: data.nutriments.fiber_100g ? data.nutriments.fiber_100g : 0,
      type: 'fiber',
      color: 'rgb(0, 224, 139)',
    },
    {
      label: 'Azúcares',
      value: data.nutriments.sugars_100g ? data.nutriments.sugars_100g : 0,
      type: 'sugars',
      color: 'rgb(233, 30, 99)',
    },
  ];
}

function cardsValues(data) {
  return [
    {
      label: 'Calorias',
      value: data.nutriments.energy_value ? data.nutriments.energy_value : 0,
      type: 'calories',
      color: 'rgb(64, 124, 255)',
    },
    {
      label: 'Grasas saturadas',
      value: data.nutriments['saturated-fat_100g']
        ? data.nutriments['saturated-fat_100g']
        : 0,
      type: 'saturated_fat',
      color: 'rgb(255, 183, 0)',
    },
    {
      label: 'Sal',
      value: data.nutriments.salt_100g ? data.nutriments.salt_100g : 0,
      type: 'salt',
      color: 'rgb(255, 183, 0)',
    },
    {
      label: 'Azúcares',
      value: data.nutriments.sugars_100g ? data.nutriments.sugars_100g : 0,
      type: 'sugars',
      color: 'rgb(233, 30, 99)',
    },
  ];
}

function getIngredientsTags(data) {
  const analysis = data.ingredients_analysis_tags;
  let ingredientsTags = [];
  if (analysis) {
    const labels = data.labels ? data.labels.split(', ') : [];

    if (analysis.includes('en:palm-oil')) {
      ingredientsTags.push({label: 'Aceite de palma', color: '#e91e63'});
    }

    if (analysis.includes('en:non-vegan')) {
      ingredientsTags.push({label: 'No vegano', color: '#e91e63'});
    }
    if (analysis.includes('en:palm-oil-free')) {
      ingredientsTags.push({
        label: 'Sin aceite de palma',
        color: '#00ce6a',
      });
    }
    if (labels.includes('Vegetariano')) {
      ingredientsTags.push({label: 'Vegetariano', color: '#00ce6a'});
    }
    if (labels.includes('Vegano')) {
      ingredientsTags.push({label: 'Vegano', color: '#00ce6a'});
    }
    if (labels.includes('Sin gluten')) {
      ingredientsTags.push({label: 'Sin gluten', color: '#00ce6a'});
    }
  }
  return ingredientsTags;
}

function filterAdditives(additives) {
  let additivesCount = {
    state: false,
    low: 0,
    moderate: 0,
    high: 0,
  };

  let filteredAdditives = [];

  if (additives && additives.length !== 0) {
    let names = new Set(additives.map(additive => additive.replace('en:', '')));

    filteredAdditives = additivesList.filter(e => names.has(e.name));
    additivesCount.state = true;

    filteredAdditives.map(a => {
      if (a.risk === 'High risks') {
        a.color = '#e91e63';
        a.sort = 3;
        additivesCount.high = additivesCount.high + 1;
      } else if (a.risk === 'Moderate risks') {
        a.color = '#ffb700';
        a.sort = 2;
        additivesCount.moderate = additivesCount.moderate + 1;
      } else if (a.risk === 'Low risks') {
        a.color = '#2AC260';
        a.sort = 1;
        additivesCount.low = additivesCount.low + 1;
      } else {
        a.color = '#edf0f4';
        a.sort = 0;
      }
      return a;
    });

    filteredAdditives.sort(function(a, b) {
      return a.sort - b.sort;
    });
  }

  return {filteredAdditives, additivesCount};
}
function getNovaScore(novaScore, ingredientsCount) {
  novaScore = Number(novaScore);
  ingredientsCount = Number(ingredientsCount);

  let process = {
    title: 'Producto sin clasificar',
    subtitle: undefined,
    value: 0,
    color: '#edf0f4',
  };

  if (novaScore) {
    switch (novaScore) {
      case 1:
        process = {
          title: 'Minimamente procesado',
          subtitle: 'Nada o mínimamente procesado',
          value: novaScore,
          color: '#00ce6a',
        };
        break;
      case 2:
        process = {
          title: 'Ingrediente culinario',
          subtitle: 'Ingrediente culinario procesado',
          value: novaScore,
          color: '#ffb700',
        };
        break;
      case 3:
        process = {
          title: 'Alimento complementario',
          subtitle: 'Buen procesado',
          value: novaScore,
          color: '#ffb700',
        };
        break;
      case 4:
        process = {
          title: 'Alimento a evitar',
          subtitle: 'Ultraprocesado',
          value: novaScore,
          color: '#e91e63',
        };
        break;
    }
  } else if (ingredientsCount) {
    if (ingredientsCount <= 1) {
      process = {
        title: 'Minimamente procesado',
        subtitle: 'Nada o mínimamente procesado',
        value: 1,
        color: '#00ce6a',
      };
    } else if (ingredientsCount > 1 && ingredientsCount <= 5) {
      process = {
        title: 'Alimento complementario',
        subtitle: 'Buen procesado',
        value: 3,
        color: '#ffb700',
      };
    } else if (ingredientsCount > 5) {
      process = {
        title: 'Alimento a evitar',
        subtitle: 'Ultraprocesado',
        value: 4,
        color: '#e91e63',
      };
    }
  }

  return process;
}

function prepareProduct(data) {
  const nutrients = nutrientsValues(data);
  const cards = cardsValues(data);
  const tags = getIngredientsTags(data);
  const additives = filterAdditives(data.additives_tags);
  const energyUnit = data.nutriments.energy_unit
    ? data.nutriments.energy_unit
    : 'Kcal';

  let ingredientsCount = data.ingredients_n ? data.ingredients_n : 0;
  let novaGroups = data.nova_groups;

  const novaScore = getNovaScore(novaGroups, ingredientsCount);

  const allergens = data.allergens_tags;
  let allergensCount;

  if (allergens) {
    allergensCount = Object.keys(allergens).length;
  } else {
    allergensCount = 0;
  }

  const image = data.image_front_url;
  const ingredientsText = data.ingredients_text;
  let name = data.name ? data.name : data.product_name;
  const code = data.code;
  const status = 1;
  const date = new Date();
  const times_scanned = 1;
  const last_scan = date;

  if (name.length > 40) {
    name = name.substring(0, 37) + '...';
  }

  const product = {
    status,
    code,
    name,
    nutrients,
    cards,
    tags,
    additives,
    energyUnit,
    ingredientsCount,
    novaScore,
    allergensCount,
    image,
    ingredientsText,
    times_scanned,
    last_scan,
  };

  return product;
}
