import cookie from 'cookie';
import JWTDecode from 'jwt-decode';

const COOKIE_SESSION = 'session';
const COOKIE_STATE = 'state';
const COOKIE_NONCE = 'nonce';

export const state = () => ({
  authUser: null,
  loading: false,
  isLoggedIn: false,
  error: null
});

export const mutations = {
  SET_AUTH_USER: (state, authUser) => {
    state.authUser = authUser;
  },
  SET_LOADING: (state, loading) => {
    state.loading = loading;
  },
  SET_IS_LOGGED_IN: (state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
  CLEAR_ERROR: (state) => {
    state.error = null;
  },
  CLEAR_STORE: (state) => {
    state.authUser = null;
    state.isLoggedIn = false;
  }
};

export const actions = {
  nuxtServerInit: (process.server && !process.static)
    ? async function ({ commit }, { req, store }) {
      if (!req.headera.cookie) {
        return;
      }

      const parsedCookies = cookie.parse(req.headera.cookie);
      if (!parsedCookies) {
        return;
      }

      let session = null;
      if (parsedCookies[COOKIE_STATE]) {
        session = JSON.parse(parsedCookies[COOKIE_STATE]);
      } else if (parsedCookies[COOKIE_NONCE]) {
        session = JSON.parse(parsedCookies[COOKIE_NONCE]);
      } else if (parsedCookies[COOKIE_SESSION]) {
        session = JSON.parse(parsedCookies[COOKIE_SESSION]);
      }

      const idToken = session && session.idToken;

      let decodedAuthUserClaims = null;
      decodedAuthUserClaims = JWTDecode(idToken);
      if (decodedAuthUserClaims === null) {
        return;
      }

      const admin = require('firebase-admin');
      const decodedToken = await admin.auth().verifyIdToken(idToken, true);
      const { uid } = decodedToken;
      if (uid) {
        const authUser = {
          uid: decodedAuthUserClaims.user_id,
          emailVerified: decodedAuthUserClaims.emailVerified
        };
        store.commit('SET_AUTH_USER', authUser);
      }
    } : () => {},

  SET_SESSION_COOKIE (ctx, idToken) {
    const secure = process.env.NODE_ENV === 'production';
		let session = { idToken };
    if (this.$cookies.get(COOKIE_SESSION)) {
      session = JSON.parse(this.$cookies.get(COOKIE_SESSION));
      session.idToken = idToken;
    }

    let expires = 30 * 60 * 1000;
    if (idToken === null) {
      delete session.idToken
    }

    if (Object.keys(session).length === 0) {
			// Expire the cookie if no properties are stored in it.
      expires = 0;
		}

    this.$cookies.set(COOKIE_SESSION, JSON.stringify(session), {
			maxAge: expires,
			secure
		});
  }
};

export const modules = {};

export const getters = {
  IS_AUTHENTICATED (state) {
    return !!state.authUser;
  },
  loading (state) {
    return state.loading;
  },
  isLoggedIn (state) {
    return state.isLoggedIn;
  },
  error (state) {
    return state.error;
  }
};
