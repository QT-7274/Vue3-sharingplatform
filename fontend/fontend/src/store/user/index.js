import { changeUser } from "../../apis/user";
import { getUser, login, register,logout } from "../../apis/auth";
export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      commit("setUser", user);
    },
    async logoutUser({commit}){
      logout()
      commit("setUser", {});
    },
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);
      commit("setUser", updatedUser);
    },
  },
  getters: {
    getUserConfirmed(state) {
      return state.user?.confirmed;
    },
    getUserInformation(state){
      return state.user;
    }
  },
};
