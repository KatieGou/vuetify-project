<template>
  <div>
    <h1>Welcome {{ username }}!</h1>
    <br/>
    <h2>Here are your favorite items.</h2>
    <br/>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">favorite_computer</th>
          <th class="text-left">favorite_phone</th>
          <th class="text-left">favorite_fruit</th>
          <th class="text-left">favorite_vegetable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <td>1</td> -->
          <td>{{ favorites[0].favorite_computer }}</td>
          <td>{{ favorites[0].favorite_phone }}</td>
          <td>{{ favorites[0].favorite_fruit }}</td>
          <td>{{ favorites[0].favorite_vegetable }}</td>
        </tr>
      </tbody>
    </v-table>

    <div>
      <v-btn @click="editFavorites" color="green">edit</v-btn>
      <v-dialog v-model="editDialog">
        <v-card>
          <v-card-title>
            <span class="center">Edit your favorites</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editingFavorites[0].favorite_computer" label="favorite computer" clearable></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editingFavorites[0].favorite_phone" label="favorite phone" clearable></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editingFavorites[0].favorite_fruit" label="favorite fruit" clearable></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editingFavorites[0].favorite_vegetable" label="favorite vegetable" clearable></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeEditFavorites">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveEditFavorites">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div>
      <br />
      <v-btn @click="logout" color="blue">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>

    <div>
      <br />
      <br />
      <p class="small-grey">Don't want to be with us anymore?</p>
      <v-btn @click="askDeleteUser" color="red">Delete Account</v-btn>
      <v-dialog v-model="deleteUserDialog">
        <v-card>
          <v-card-title>
            <span class="center">Delete Account</span>
          </v-card-title>
          <v-card-text>
            <p>Are you sure you want to delete your account?</p>
            <!-- password verification? -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="deleteUser">Yes</v-btn>
            <v-btn color="blue darken-1" text @click="closeDeleteUser">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { getFavorites, postFavorite, deleteAUser } from '@/api/api';
import { deepCopy } from '@/utils/utils';

export default {
  name: 'Users favorite items',
  data() {
    return {
      userID: null,
      // username: null,
      favorites: [
        {
          favorite_computer: "",
          favorite_phone: "",
          favorite_fruit: "",
          favorite_vegetable: ""
        },
      ],
      editingFavorites: [],
      editDialog: false,
      deleteUserDialog: false,
    };
  },
  computed: {
    username() {
      return sessionStorage.getItem('username') || 'Guest';
    },
  },
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      this.userID = this.$route.params.userid;
      // this.username = this.$route.params.username;
      // console.log('userid:', this.$route.params.userid);
      const raw_favorites = await getFavorites(this.userID);
      this.favorites = raw_favorites.data;
      // console.log('favorites:', this.favorites[0]);
    },
    editFavorites() {
      this.editDialog = true;
      this.editingFavorites = deepCopy(this.favorites);
    },
    closeEditFavorites() {
      this.editDialog = false;
      // this.editingFavorites = this.favorites;
    },
    async saveEditFavorites() {
      // console.log(this.userID, this.favorites[0])
      this.favorites = this.editingFavorites;
      await postFavorite(this.userID, this.favorites[0]);
      this.editDialog = false;
    },
    logout() {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userid');
      this.$router.push({ name: 'Home' });
    },
    askDeleteUser() {
      this.deleteUserDialog = true;
    },
    closeDeleteUser() {
      this.deleteUserDialog = false;
    },
    async deleteUser() {
      this.deleteUserDialog = false;
      await deleteAUser(this.userID);
      this.$router.push({ name: 'Home' });
    },
  }
}
</script>