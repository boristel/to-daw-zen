<template>
  <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account? 
                <router-link class="router-link" :to="{ name: `Login`}">
                    Login to Member Area
                </router-link>
            </p>
            <h2> Create Your New Member</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstname" />
                    <userIcon class="icon"></userIcon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastname" />
                    <userIcon class="icon"></userIcon>
                </div>
                <div class="input">
                    <input type="text" placeholder="username" v-model="username" />
                    <userIcon class="icon"></userIcon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                    <emailIcon class="icon"></emailIcon>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <passIcon class="icon"></passIcon>
                </div>
                <div v-show="error" class="error" >{{ this.errorMsg }}</div>
            </div>
            <button @click.prevent="register">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background">
          
        </div>
    </div>   
</template>

<script>
import emailIcon from "../assets/Icons/envelope-regular.svg";
import passIcon from "../assets/Icons/lock-alt-solid.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import firebase  from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name: "Register",
  components: {
    emailIcon,
    passIcon,
    userIcon,
  }, 
  data() {
    return {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        error : null,
        errorMsg : "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.lastname !== "" &&
        this.firstname !== "" &&
        this.username !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
        });
        this.$router.push({ name: "Home"});
        return;
      }
      this.error = true;
      this.errorMsg = "Error Fields"; 
      return; 
    },
  }

};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>