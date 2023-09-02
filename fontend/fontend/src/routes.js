import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import ProfileEdittingPage from "./pages/ProfileEdittingPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import SearchPage from "./pages/SearchPage.vue";
import { getJwtToken } from "./apis/auth";
import { useStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

// 重写push和replace方法，防止多次调用时出现错误
let originPush = createRouter.prototype.push;
let originReplace = createRouter.prototype.replace;
createRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
createRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
const routes = [
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
 
  {
    path: "/search_result:term?",
    name: "search_result",
    component: SearchPage,
    props: (route) => ({
      term: route.params.term || " ",
    }),
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    name: "profileEdit",
    component: ProfileEdittingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/",
    redirect: "/home",
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let token = getJwtToken();
  const isUserConfirmed = store.getters.getUserConfirmed;

  if (token) {
    if (to.path === "/login") {
      next("/home");
    } else {
      if (isUserConfirmed) {
        next();
      } else {
        await store.dispatch("logoutUser");
        next("/login");
      }
    }
  } else {
    let toPath = to.path;
    if (
      toPath.indexOf("/profile") !== -1 ||
      toPath.indexOf("/profile/edit") !== -1
    ) {
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }
  }
});

export { router };
