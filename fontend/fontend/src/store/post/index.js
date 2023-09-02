import { loadPosts,  createPost,likePost, favorPost } from "../../apis/post";
export const post = {
  state() {
    return {
      list: [],
      searchResult: [],
      currentId: null,
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
    },
    setCurrentId(state, id) {
      state.currentId = id;
    },
    setPostsSearchResult(state, posts) {
      state.searchResult = posts;
    },
    //note
    /**
     * 1. 首先，根据给定的id参数，在状态state的列表list中找到对应的帖子post。
     * 2. 如果isLike为true，表示要点赞该帖子，则将帖子的liked_bies属性加1。如果liked_bies属性不存在，则默认为0再加1，防止undefined + 1。
     * 3. 如果isLike为false，表示要取消点赞该帖子，则将帖子的liked_bies属性减1。
     * 4. 最后，将帖子的likedByMe属性设置为isLike的值。
     */
    toggleLike(state, { id, isLike }) {
      let post = []
      if(state.searchResult.length){
        post = state.searchResult.find((post) => post.id === id);
      }else{
        post = state.list.find((post) => post.id === id);
      }
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
      
    },
    toggleFavor(state, { id, isFavor }) {
      let post = []
      if(state.searchResult.length){
        post = state.searchResult.find((post) => post.id === id);
      }else{
        post = state.list.find((post) => post.id === id);
      }
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    increaseCommentCount(state, id) {
      let post = []
      if(state.searchResult.length){
        post = state.searchResult.find((post) => post.id === id);
      }else{
        post = state.list.find((post) => post.id === id);
      }
      post.comments++;
    },
  },
  actions: {
    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },
    async toggleLike({ commit }, id) {
      
      const isLike = await likePost(id);
      commit("toggleLike", { id, isLike });
      
    },
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPost(id);
      commit("toggleFavor", { id, isFavor });
    },
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      dispatch("loadAllPosts");
      // 关闭对话框并清空上传的图片
      commit("changeShowPostUpload", false);
    },
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null);
      commit("changeShowPostDetails", false);
    },
    async showPostDetails({ commit, dispatch }, id) {
   
      /**
       * 根据取得的post.id：
       * 1.存储这个id
       * 2.加载这个id下的所有评论，而这个acitons在comment文件夹下
       * 3.改变显示发布详情的状态
       */
      
      commit("setCurrentId", id);
      dispatch("loadAllComments", id);
      commit("changeShowPostDetails", true);
    },
    async searchPosts({ commit }, term="") {
      const posts = await loadPosts("filters[description][$contains]=" + term);
      commit("setPostsSearchResult", posts);
    },
    clearSearchResult({commit}){
        commit("setPostsSearchResult",{})
    }
  },
  getters: {
    postDetails(state) {
      //此时就需要存储的id
      if(state.searchResult.length){
      return state.searchResult.find((post) => post.id === state.currentId);
      }else{
        return state.list.find((post) => post.id === state.currentId);
      }
    },
  },
};
