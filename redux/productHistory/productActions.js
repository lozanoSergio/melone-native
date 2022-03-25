import AsyncStorage from '@react-native-community/async-storage';
import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_FROM_HISTORY,
} from './productConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getProductHistory = lastProduct => async (dispatch, getState) => {
  try {
    dispatch(asyncActionStart());
    const localProductsString = await AsyncStorage.getItem('history_products');
    let products = JSON.parse(localProductsString);

    const querySnap = {
      docs: products,
    };

    if (products !== null && products.length > 0 && !lastProduct) {
      dispatch({type: FETCH_PRODUCTS, payload: {products}});
      dispatch(asyncActionFinish());
      return querySnap;
    } else {
      const fetchProducts = await getProducts(lastProduct);
      if (fetchProducts.querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return fetchProducts.querySnap;
      }

      const queryProducts = fetchProducts.products;
      dispatch({type: FETCH_PRODUCTS, payload: {products: queryProducts}});
      dispatch(asyncActionFinish());
      return fetchProducts.querySnap;
    }
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

const getProducts = async lastProduct => {
  const user = firebase.auth().currentUser;
  const userRef = firestore().collection('Users');

  let productHistoryRef = userRef.doc(user.uid).collection('product_history');

  let startAfter =
    lastProduct && (await productHistoryRef.doc(lastProduct.id).get());
  let query;

  lastProduct
    ? (query = productHistoryRef
        .where('visible', '==', true)
        .orderBy('last_scan', 'desc')
        .startAfter(startAfter)
        .limit(25))
    : (query = productHistoryRef
        .where('visible', '==', true)
        .orderBy('last_scan', 'desc')
        .limit(50));

  let querySnap = await query.get();

  if (querySnap.docs.length === 0) {
    return {querySnap};
  }

  let products = [];

  for (let i = 0; i < querySnap.docs.length; i++) {
    let id = querySnap.docs[i].id;
    let code = querySnap.docs[i].data().code;
    let scanned = querySnap.docs[i].data().times_scanned;
    let lastScan = querySnap.docs[i].data().last_scan.toDate();
    await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status !== 0) {
          let product = {
            id: id,
            code: code,
            name: responseJson.product.product_name,
            image: responseJson.product.image_url,
            times_scanned: scanned,
            last_scan: lastScan,
          };
          products.push(product);
        }
      });
  }

  if (products && !lastProduct) {
    try {
      await AsyncStorage.setItem('history_products', JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }

  return {querySnap, products};
};

export const addProductToHistory = product => async (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  const userRef = firestore().collection('Users');
  const localProductsString = await AsyncStorage.getItem('history_products');
  let localProducts = JSON.parse(localProductsString);

  if (!localProducts) {
    localProducts = [];
  }

  try {
    let query = userRef.doc(user.uid).collection('product_history');
    let productQuery = await query.where('code', '==', product.code);
    let productQuerySnap = await productQuery.get();

    console.log(product.last_scan);

    if (productQuerySnap.docs.length === 0) {
      await query
        .doc(product.code)
        .set({
          code: product.code,
          times_scanned: 1,
          last_scan: product.last_scan,
          visible: true,
          timestamps: [product.last_scan],
        })
        .then(async function() {
          let newProduct = {
            id: product.code,
            code: product.code,
            name: product.name,
            image: product.image,
            times_scanned: 1,
            last_scan: product.last_scan,
          };

          if (localProducts) {
            localProducts = localProducts.filter(filteredProduct => {
              return filteredProduct.id !== product.code;
            });

            if (localProducts.length >= 50) {
              localProducts.shift();
            }
          }

          localProducts.push(newProduct);
          await AsyncStorage.setItem(
            'history_products',
            JSON.stringify(localProducts),
          );

          dispatch({type: ADD_PRODUCT, payload: {product: newProduct}});
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
        });
    } else {
      let querySnap = query.doc(product.code);
      firestore()
        .runTransaction(function(transaction) {
          return transaction.get(querySnap).then(async function(result) {
            if (!result.exists) {
              throw 'Document does not exist!';
            }
            let newProduct = {
              id: result.data().code,
              code: result.data().code,
              name: product.name,
              image: product.image,
              times_scanned: result.data().times_scanned + 1,
              last_scan: product.last_scan,
            };

            if (localProducts) {
              localProducts = localProducts.filter(productResult => {
                return productResult.id !== product.code;
              });

              if (localProducts.length >= 50) {
                localProducts.shift();
              }
            }

            localProducts.push(newProduct);
            await AsyncStorage.setItem(
              'history_products',
              JSON.stringify(localProducts),
            );

            transaction.update(querySnap, {
              times_scanned: result.data().times_scanned + 1,
              last_scan: product.last_scan,
              visible: true,
            });

            dispatch({type: ADD_PRODUCT, payload: {product: newProduct}});
          });
        })
        .then(async function() {})
        .catch(function(error) {
          console.log('Transaction failed: ', error);
        });
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFromHistory = product => async (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  const userRef = firestore().collection('Users');
  const localProductsString = await AsyncStorage.getItem('history_products');
  const localProducts = JSON.parse(localProductsString);

  try {
    dispatch(asyncActionStart());
    let query = userRef.doc(user.uid).collection('product_history');
    let productQuery = await query.where('code', '==', product.code);

    let productQuerySnap = await productQuery.get();

    if (productQuerySnap.docs.length !== 0) {
      await query
        .doc(product.code)
        .update({
          visible: false,
        })
        .then(async function() {
          dispatch({type: REMOVE_FROM_HISTORY, payload: {product}});

          if (localProducts) {
            let newLocalProducts = localProducts.filter(
              localProduct => localProduct.id !== product.id,
            );
            await AsyncStorage.setItem(
              'history_products',
              JSON.stringify(newLocalProducts),
            );
          }

          dispatch(asyncActionFinish());
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
          dispatch(asyncActionError());
        });
    }
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};
