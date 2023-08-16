<template>
  <div>
    <h1>User data</h1>
    <div v-if="userID">
      <p>Show user's favorite items!</p>
    </div>
  </div>
</template>

<script>
import {getFavorites} from '@/api/api';

export default {
  name: 'Users favorite items',
  data () {
    return {
      userID: null,
      favorites: [],
    };
  }, 
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      this.userID = this.$route.params.userid;
      // console.log('userid:', this.$route.params.userid);
      this.favorites = await getFavorites(this.userID);
      console.log('favorites:', this.favorites);
    }
  }
}
</script>