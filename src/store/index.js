import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      // userid: null,
      // username: null
      userid: sessionStorage.getItem('userid') || null,
      username: sessionStorage.getItem('username') || null
    }
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
    }
  }
});
