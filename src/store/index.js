import Vue from 'vue'
import Vuex from 'vuex'
import firebase  from "firebase/app";
import "firebase/auth";
// import db from "../components/firebase/firebaseinit";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    blogPosts:[],
    postLoaded: null,
    blogHtml: "Write Your Blog Here...",
    blogTitle:"",
    blogPhotoName:"",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost : null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload){
      state.blogHtml = payload;
      // console.log(state.blogHtml)
    },
    updateBlogTitle(state, payload){
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload;
    },
    createFileUrl(state, payload){
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      // console.log(state.editPost)
    },
    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileAdmin(state,payload){
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },

    SetProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstname;
      state.profileLastName = doc.data().lastname;
      state.profileUserName = doc.data().username;
      
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("")
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("SetProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
    async getPost({state}){
      const dataBase = await db.collection('blogPosts').orderBy('date','desc');
      const dbResults = await dataBase.get();
      dbResults.forEach(doc => {
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHtml: doc.data().blogHtml,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
      console.log(state.blogPosts);
    },
    async updateUserSettings({commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId); 
      await dataBase.update({
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
      });
      commit("setProfileInitials");
    },
   
  },
  modules: {
  }
})
