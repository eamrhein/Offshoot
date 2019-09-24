import React from 'react';
import ReactDOM from 'react-dom';

import "./styles/index.scss";

// We will create this component shortly
import Root from './components/root';
import configureStore from './store/store';
//to parse the user's session token
import jwt_decode from 'jwt-decode';
// The session utility we just created
import { setAuthToken } from './util/session_api_util';

// We have not created this action yet, but will do so in the next step
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  const devState = {
    entities: {
      users: {
        1: {
          id: 35,
          lastviewedPanel: 1,
          username: 'noodle',
          followedRoots: [3, 5, 20],
          authoredRoots: [2, 4, 7]
        }
      }
      ,
      roots: [
        1, 2, 3
      ],
      panels: {
        1: {
          authorId: 'noodle',
          title: 'cookiemonster',
          panelText: 'The monster ate all the cookies',
          photoURL: 'http://aol.com/sjfghksjkdfh',
          childId: [5, 8],
          parentId: null,
          likes: 89
        },
        comments: {
          1: {
            pandelId: 1,
            authorId: 35,
            comment: 'Not the cookies!'
          }
        }
      }
    },
    ui: {
      modal: 'OPEN MODAL'
    },
    errors: {
      session: {},
      posts: {}
    },
    session: {
      user_id: 35,
    }
  }
  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    devState.session = { isAuthenticated: true, user: decodedUser }
    const preloadedState = devState;

    // const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore(devState);
  }
  window.store = store;
  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});