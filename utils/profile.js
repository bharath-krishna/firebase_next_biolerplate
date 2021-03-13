import firebase from "./firebaseClient";

export const createProfile = async (profileData) => {
  const data = await firebase
    .firestore()
    .collection("profile")
    .doc(profileData.id)
    .set(profileData);
};
