import firebase from "./firebaseClient";

export const fetchCollection = async (collectionName, setter) => {
  const data = await firebase.firestore().collection(collectionName).get();
  setter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export const deleteFromCollection = async (collectionName, id) => {
  const data = await firebase
    .firestore()
    .collection(collectionName)
    .doc(id)
    .delete();
};
