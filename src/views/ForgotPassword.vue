<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <Loading v-if="vloading" />
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Back to 
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot Password</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <emailIcon class="icon"></emailIcon>
                    </div>
                </div>
                <button @click.prevent="resetPassword">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>
<script>

import EmailIcon from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/auth";
export default {
   name : "ForgotPassword",
   data() {
    return {
        email: "",
        modalActive: false,
        modalMessage: "",
        vloading: null,
    }
   },
   components : {
    EmailIcon,
    Modal,
    Loading,
   },
   methods: {
    resetPassword() {
        this.vloading = true;
        firebase.auth().sendPasswordResetEmail(this.email).then(() =>{
            this.modalMessage = "if Account Exist, you will receive email";
            this.vloading = false;
            this.modalActive = true;
        }).catch(err => {
            this.modalMessage = err.message;
            this.vloading = false;
            this.modalActive = true;
        });
    },
    closeModal() {
        this.modalActive= !this.modalActive;
        this.email = "";
    },
   },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
  
}

</style>
