<template>
    <div>
      <h1>User Register</h1>
      <form @submit.prevent="registerUser">
        <!-- <input type="text" v-model="userData.username" placeholder="user name" required> -->
        <v-text-field v-model="userData.username" label="Username" required></v-text-field>
        <!-- <input type="password" v-model="userData.password" placeholder="password" required> -->
        <v-text-field v-model="userData.password" label="Password" required></v-text-field>
        <br>
        <button type="submit">Register</button>
      </form>
  
      <div>
        <h2 class="small-grey">Already a user? <a href="#" @click="loginUser">Login</a></h2>
        <v-btn>Primary Button</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { postRegister } from '@/api/api';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        userData: {
          username: '',
          password: '',
        },
        registrationStatus: false,
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
      loginUser(){
        // this.$router.push('/login');
        console.log('loginUser()');
      }
    },
  };
  </script>