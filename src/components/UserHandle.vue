<template>
  <div>
    <div>
      <h1>User Register</h1>
      <form @submit.prevent="registerUser">
        <v-text-field :style="{ width: '300px' }" v-model="userData.username" label="Username" required></v-text-field>
        <v-text-field v-model="userData.password" label="Password" required></v-text-field>
        <v-btn type="submit">Register</v-btn>
      </form>
    </div>

    <div>
      <br />
      <h1>Already a user?</h1>
      <v-btn @click="userLoginInfo">Login</v-btn>
      <v-dialog v-model="loginClicked">
        <v-card>
          <v-card-title>
            <span class="center">Login</span>
          </v-card-title>
          <v-card-text>
              <v-text-field v-model="userData.username" label="Username" required></v-text-field>
              <v-text-field v-model="userData.password" label="Password" required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="closeLogin">Close</v-btn>
              <v-btn color="blue" text @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
  
<script>
import { postRegister, postLogin } from '@/api/api';

export default {
  name: 'UserRegister',
  data() {
    return {
      userData: {
        username: '',
        password: '',
      },
      registrationStatus: false,
      loginClicked: false,
    };
  },
  methods: { // only operations related to frontend
    registerUser() {
      postRegister(this.userData);
      this.userData = {
        username: '',
        password: '',
      };
      this.registrationStatus = true;
    },
    userLoginInfo() {
      // this.$router.push('/login');
      this.loginClicked = true;
      // console.log(this.loginClicked);
    },
    closeLogin() {
      this.loginClicked = false;
    },
    login(){
      postLogin(this.userData);
      this.userData = {
        username: '',
        password: '',
      };
      console.log(this.userData);
      this.loginClicked = false;
    }
  },
};
// TODO: login at backend
</script>