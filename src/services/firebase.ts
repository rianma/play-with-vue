import firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store/index';
import { LoginUser } from '@/store/firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBNbygy9enZiS5WeDmdYHFBn7dVCEap92A',
  authDomain: 'flickering-heat-704.firebaseapp.com',
  databaseURL: 'https://flickering-heat-704.firebaseio.com',
  projectId: 'flickering-heat-704',
  storageBucket: 'flickering-heat-704.appspot.com',
  messagingSenderId: '535389035287',
  appId: '1:535389035287:web:0de5bd42102df44600f552',
};

firebase.initializeApp(firebaseConfig);

const formatUserInfo = (user: firebase.User): LoginUser => {
  const githubUserData = user.providerData[0] || {} as any;
  return {
    displayName: githubUserData.displayName || '',
    email: githubUserData.email || '',
    photoURL: githubUserData.photoURL || '',
    providerId: githubUserData.providerId,
    uid: githubUserData.uid,
  };
};

export const getCurrentUser = () => firebase.auth().currentUser;

export const login = () => {
  const user = getCurrentUser();
  if (user) {
    console.log('User is already signed in.');
    store.commit('firebase/setLoginUser', formatUserInfo(user));
    return Promise.resolve(user);
  }

  console.log('User is not signed in, redirecting to sign-in flow');
  const provider = new firebase.auth.GithubAuthProvider();
  provider.setCustomParameters({
    // eslint-disable-next-line @typescript-eslint/camelcase
    allow_signup: 'false',
  });

  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('User is signed in.');
      if (result.user) {
        store.commit('firebase/setLoginUser', formatUserInfo(result.user));
      }
      return result.user;
    });
};
