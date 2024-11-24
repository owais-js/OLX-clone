
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

import {
  getDocs, doc,
  collection, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9nplk1w_Us4tXTSUsrkFnHObxxsVUSL8",
  authDomain: "olx-clone-d6899.firebaseapp.com",
  projectId: "olx-clone-d6899",
  storageBucket: "olx-clone-d6899.appspot.com",
  messagingSenderId: "207249975973",
  appId: "1:207249975973:web:10dbe97715c5ce3ee7fb4c",
  measurementId: "G-PJWE3MSH6S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



const storage = getStorage(app);



async function postAdToDb(ad) {
  /*
  1. Upload image to Storage
  2. Get the URL of the image
  3. Add all data with URL in database
  */


  try {
    const storageRef = ref(storage, `ads/${ad.image.name}`);

    await uploadBytes(storageRef, ad.image)

    const url = await getDownloadURL(storageRef)

    ad.image = url


    await addDoc(collection(db, "ads"), ad)
    alert('Data added successfully!')
  } catch (e) {
    alert(e.message)
  }
}

async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"))
  const ads = []
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    // const ad = { id: doc.id, ...doc.data() }

    const ad = doc.data()
    ad.id = doc.id

    ads.push(ad)
  });

  return ads
}

async function getSingleAd(adId) {
  const docRef = doc(db, "ads", adId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ad = docSnap.data()

    return ad
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function getUser(uid) {
  console.log('uid', uid)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data()

    return user
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

function logout() {
  return signOut(auth)
}

async function myAdd(uid) {
  const q = query(collection(db, "ads"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  // Extract data from the query snapshot
  const ads = [];
  querySnapshot.forEach((doc) => {

    const ad = doc.data()
    ad.id = doc.id

    ads.push(ad)
  });

  return ads;
}
// async function getAds() {
//   const querySnapshot = await getDocs(collection(db, "ads"))
//   const ads = []
//   querySnapshot.forEach((doc) => {
//       // console.log(doc.id, " => ", doc.data());
//       // const ad = { id: doc.id, ...doc.data() }

//       const ad = doc.data()
//       ad.id = doc.id

//       ads.push(ad)
//   });

//   return ads
// }

export {
  postAdToDb,
  getAds,
  getSingleAd,
  getUser,
  logout,
  myAdd
}