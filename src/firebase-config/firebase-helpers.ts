import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";

// create new user document
export const createUserDocument = async (user: User) => {
  if (!user) return;
  // grab a reference to the users collection using the user's id
  const userRef = doc(db, "users", user.uid);
  // grab the data that exists within that document
  const userSnapshot = await getDoc(userRef);

  // if it dosen't exist, then create a new user document with the user's email and display name
  if (!userSnapshot.exists()) {
    const { email, displayName } = user;
    try {
      const response = await setDoc(userRef, { email, displayName });
    } catch (err) {
      console.log(err);
    }
  } else {
    // if the user does exist, then just return the reference to the user document with that id
    return userRef;
  }
  return userRef;
};
