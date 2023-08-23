<template>
  <div>
    <div>
      <h1>New User Register</h1>
      <br />
      <form @submit.prevent="registerUser">
        <v-text-field :style="{ width: '400px' }" v-model="userData.username" label="Username" required clearable></v-text-field>
        <v-text-field v-model="userData.password" label="Password" required clearable></v-text-field>
        <v-btn type="submit">Register</v-btn>
      </form>
    </div>

    <div>
      <br />
      <br />
      <br />
      <h1>Already a user?</h1>
      <br />
      <v-btn @click="userLoginInfo">Login</v-btn>
      <v-dialog v-model="loginClicked" width="600px">
        <v-card>
          <v-card-title>
            <span class="center">Login</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="loginData.username" label="Username" required clearable></v-text-field>
            <v-text-field v-model="loginData.password" label="Password" required clearable></v-text-field>
            <p v-if="wrongPassword" style="color: red;">Wrong password. Please re-enter your password.</p>
            <p v-if="nonExistingUser" style="color: red;">Username not found. Please ensure the user is registered before.</p>
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
      loginData: {
        username: '',
        password: '',
      },
      loginClicked: false,
      loginStatus: '',
      wrongPassword: false,
      nonExistingUser: false,
      // forgotPassword: false,
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
      this.loginClicked = true;
    },
    closeLogin() {
      this.loginClicked = false;
      this.loginData = {
        username: '',
        password: '',
      };
    },
    async login() {
      this.loginStatus = await postLogin(this.loginData);
      this.loginData = {
        username: '',
        password: '',
      };
      // console.log('loginStatus: ', this.loginStatus);
      if (this.loginStatus === 'Wrong password') {
        this.wrongPassword = true;
        this.nonExistingUser = false;
      } else if (this.loginStatus === 'User does not exist') {
        this.nonExistingUser = true;
        this.wrongPassword = false;
      } else {
        sessionStorage.setItem('userid', this.loginStatus.data[0].user_id);
        sessionStorage.setItem('username', this.loginStatus.data[0].username);
        this.$router.push(`/users/${this.loginStatus.data[0].user_id}`);
        // console.log('loginStatus: ', this.loginStatus.data[0].username);
        this.loginClicked = false;
        this.wrongPassword = false;
        this.nonExistingUser = false;
      }
    }
  },
};
</script>