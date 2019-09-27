import React from 'react';
import ReactDOM from 'react-dom';

import "./styles/index.scss";

// We will create this component shortly
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { followRoot, unfollowRoot, authorRoot, unauthorRoot } from './actions/user_actions'
document.addEventListener('DOMContentLoaded', () => {
  let store;
  const devState = {
    // entities: {
    //   users: {
    //     1: {
    //       id: 35,
    //       lastviewedPanel: 1,
    //       username: 'noodle',
    //       followedRoots: [3, 5, 20],
    //       authoredRoots: [2, 4, 7]
    //     }
    //   }
    //   ,
    //   roots: [
    //     1, 2, 3
    //   ],
    //   panels: {
    //     1: {
    //       authorId: 'noodle',
    //       title: 'cookiemonster',
    //       panelText: 'The monster ate all the cookies',
    //       photoURL: 'http://aol.com/sjfghksjkdfh',
    //       childId: [5, 8],
    //       parentId: null,
    //       likes: 89
    //     },
    //     comments: {
    //       1: {
    //         pandelId: 1,
    //         authorId: 35,
    //         comment: 'Not the cookies!'
    //       }
    //     }
    //   }
    // },
    // ui: {
    //   currentModal: null
    // },
    // errors: {
    //   session: {},
    //   posts: {}
    // },
    // session: {
    //   user_id: 35,
    // }
  }
  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    devState.session = { isAuthenticated: true, user: decodedUser }
    const preloadedState = devState;

    // const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore(devState);
  }
  window.store = store;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.followRoot = followRoot;
  window.unfollowRoot = unfollowRoot;
  window.authorRoot = authorRoot;
  window.unauthorRoot = unauthorRoot;
  // Render our root component and pass in the store as a prop

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});