import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

const userRef = firestore().collection('Users');

export async function signInWithFacebook() {
  try {
    const request = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (request.isCancelled) {
      // handle this however suites the flow of your app
      throw new Error('User cancelled request');
    }

    console.log(
      `Login success with permissions: ${request.grantedPermissions.toString()}`,
    );

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Something went wrong obtaining the users access token');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // login with credential
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then(result => {
        if (result.additionalUserInfo.isNewUser) {
          userRef.doc(result.user.uid).set({
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            photoURL: result.user.photoURL,
            facebookName: result.additionalUserInfo.profile.name
              ? result.additionalUserInfo.profile.name
              : null,
            firstName: result.additionalUserInfo.profile.first_name
              ? result.additionalUserInfo.profile.first_name
              : null,
            middleName: result.additionalUserInfo.profile.middle_name
              ? result.additionalUserInfo.profile.middle_name
              : null,
            lastName: result.additionalUserInfo.profile.last_name
              ? result.additionalUserInfo.profile.last_name
              : null,
            providerId: result.additionalUserInfo.providerId,
            last_logged_in: Date.now(),
            createdAt: Date.now(),
          });
        } else {
          userRef.doc(result.user.uid).update({
            last_logged_in: Date.now(),
          });
        }
      });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert(
        'Email ya registrado',
        'Es posible que tu email ya este vinculado a otro inicio de sesión. Si tienes problemas intentando iniciar sesión con tu cuenta, por favor ponte en contacto con nosotros enviando un email a contacto@melone.io',
      );
    }
  }
}

export async function signInWithGoogle() {
  // add any configuration settings here:
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.configure({
    webClientId:
      '871606023918-q95gnkkmmj102e3ki64lk0jrcd1unlo0.apps.googleusercontent.com',
    iosClientId:
      '871606023918-30ion99l5c2scp2bp4l9lf79mou65q77.apps.googleusercontent.com',
  });
  const data = await GoogleSignin.signIn();

  // create a new firebase credential with the token
  const credential = firebase.auth.GoogleAuthProvider.credential(
    data.idToken,
    data.accessToken,
  );
  // login with credential
  await firebase
    .auth()
    .signInWithCredential(credential)
    .then(function(result) {
      if (result.additionalUserInfo.isNewUser) {
        userRef.doc(result.user.uid).set({
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          name: result.additionalUserInfo.profile.name,
          photoURL: result.user.photoURL,
          givenName: result.additionalUserInfo.profile.given_name
            ? result.additionalUserInfo.profile.given_name
            : null,
          familyName: result.additionalUserInfo.profile.family_name
            ? result.additionalUserInfo.profile.family_name
            : null,
          providerId: result.additionalUserInfo.providerId,
          locale: result.additionalUserInfo.profile.locale,
          last_logged_in: Date.now(),
          createdAt: Date.now(),
        });
      } else {
        userRef.doc(result.user.uid).update({
          last_logged_in: Date.now(),
        });
      }
    })
    .catch(error => {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Error',
          'Los servicios de google play se encuentran desactualizados.',
        );
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Email ya registrado',
          'Es posible que tu email ya este vinculado a otro inicio de sesión. Si tienes problemas intentando iniciar sesión con tu cuenta, por favor ponte en contacto con nosotros enviando un email a contacto@melone.io',
        );
      }
    });
}

export async function signOut() {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.configure({
        webClientId:
          '871606023918-q95gnkkmmj102e3ki64lk0jrcd1unlo0.apps.googleusercontent.com',
      });
      await GoogleSignin.signOut();
    }

    await firebase.auth().signOut();
    await AsyncStorage.clear();
  } catch ({message}) {
    console.log(message);
    Alert.alert('Error', 'Ha ocurrido un error inesperado...');
  }
}

export async function signInWithEmail(values) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(result => {
      userRef.doc(result.user.uid).update({
        last_logged_in: Date.now(),
      });
    })
    .catch(async error => {
      let errorMessage = '';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Email o contraseña incorrectos.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta.';
      } else {
        errorMessage =
          'En este momento nuestros sistemas están sobrecargados. Por favor, inténtalo de nuevo dentro de unos minutos.';
      }
      return Promise.reject(errorMessage);
    });
}

export async function signUpWithEmail(values) {
  let errorMessage;

  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(result => {
        let currentUser = firebase.auth().currentUser;
        userRef.doc(currentUser.uid).set({
          email: values.email,
          emailVerified: false,
          providerId: 'password',
          createdAt: Date.now(),
        });
      });
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = {
        message: 'El email introducido ya se encuentra registrado.',
        code: error.code,
      };
    } else {
      errorMessage = {
        message:
          'En este momento nuestros sistemas están sobrecargados. Por favor, inténtalo de nuevo dentro de unos minutos.',
        code: error.code,
      };
    }

    return Promise.reject(errorMessage);
  }
}

export async function sendResetPasswordResetEmail(value) {
  await firebase
    .auth()
    .sendPasswordResetEmail(value.email)
    .then(function(result) {
      Promise.resolve(result);
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error);
    });
}

export async function createUsername(values) {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const username = values.username.toLowerCase();

  if (username.length > 15) {
    let errorMessage = 'El nombre de usuario es demasiado largo.';

    return Promise.reject(errorMessage);
  }

  let query = userRef.where('username', '==', username).limit(1);

  let querySnap = await query.get();

  if (querySnap.docs.length === 0) {
    await firestore()
      .collection('Users')
      .doc(uid)
      .update({username, displayName: username})
      .then(function(result) {
        return Promise.resolve(result);
      })
      .catch(function(e) {
        console.log(e);
        let errorMessage = {
          code: 'auth/undefined',
          message:
            'En este momento nuestros sistemas están sobrecargados. Por favor, inténtalo de nuevo dentro de unos minutos.',
        };
        return Promise.reject(errorMessage);
      });
  } else {
    const error = 'Nombre de usuario no disponible.';

    return Promise.reject(error);
  }
}
