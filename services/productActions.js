import cuid from 'cuid';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = firebase.auth().currentUser;

export async function saveNewProduct(images) {
  const folder = cuid();
  const newProductsRef = firestore()
    .collection('NewProducts')
    .doc(folder);
  const date = new Date();

  newProductsRef.set({
    created_at: date,
    userId: user.uid,
    verified: false,
  });
  try {
    await images.map(async image => {
      const imageName = image.name;

      firebase
        .storage()
        .ref(`users/${user.uid}/products_images/${folder}/${imageName}`)
        .putFile(image.uri)
        .on(
          'state_changed',
          async snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              snapshot.ref.getDownloadURL().then(async downloadURL => {
                await newProductsRef.update({[imageName]: downloadURL});
              });
            }
          },
          error => {
            console.log(error);
            return Promise.resolve({type: 'error'});
          },
        );
    });
    return Promise.resolve({type: 'success'});
  } catch (error) {
    return Promise.resolve({type: 'error'});
  }
}
