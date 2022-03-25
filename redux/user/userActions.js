import {FETCH_USER, UPDATE_PROFILE} from './userConstants';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

export const getUser = () => async (dispatch, getState) => {
  const uid = firebase.auth().currentUser.uid;
  const firestore = firebase.firestore();
  const usersRef = firestore.collection('Users');

  const localUserString = await AsyncStorage.getItem('user');
  const user = JSON.parse(localUserString);

  if (user !== null && user.username && user.photoURL) {
    dispatch({type: FETCH_USER, payload: {user}});
    return user;
  } else {
    try {
      let query = usersRef.doc(uid);
      let querySnap = await query.get();

      let userData = querySnap.data();

      if (userData) {
        userData.uid = uid;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        dispatch({type: FETCH_USER, payload: {user: userData}});
        return userData;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const savePhotoURL = (userData, file) => async (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  const firestore = firebase.firestore();
  const userRef = firestore.collection('Users').doc(user.uid);
  const ext = file.split('.').pop();

  firebase
    .storage()
    .ref(`users/${user.uid}/profile_images/profile.${ext}`)
    .putFile(file)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      async snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          snapshot.ref.getDownloadURL().then(async downloadURL => {
            userRef.update({photoURL: downloadURL});
            user.updateProfile({photoURL: downloadURL});
            userData.photoURL = downloadURL;
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            dispatch({type: UPDATE_PROFILE, payload: {user: userData}});
          });
        }
      },
      error => {
        console.log('error');
      },
    );
};

export const updateDisplayName = (userData, displayName) => async (
  dispatch,
  getState,
) => {
  const user = firebase.auth().currentUser;
  const firestore = firebase.firestore();
  const userRef = firestore.collection('Users').doc(user.uid);

  await userRef.update({displayName});

  userData.displayName = displayName;

  if (displayName) {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    dispatch({type: UPDATE_PROFILE, payload: {user: userData}});
  }
};
