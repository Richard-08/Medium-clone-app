<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title is-3" style="color: #fff">Medium</h1>
      </router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable" v-if="userLogin">
        <a class="navbar-link">
          {{ getUser.name }}
        </a>

        <div class="navbar-dropdown is-right">
          <router-link to="/my-posts" class="navbar-item" v-if="isWriterUser">
            My posts
          </router-link>
          <router-link to="/new-post" class="navbar-item" v-if="isWriterUser">
            Create new post
          </router-link>
          <hr class="navbar-divider" />
          <a href="#" class="navbar-item" @click.prevent="logout">
            Log out
          </a>
        </div>
      </div>

      <div class="navbar-item" v-else>
        <div class="buttons">
          <router-link to="/login" class="button is-primary">
            Log in
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['getUser']),
    userLogin() {
      if (this.getUser.role) {
        return true;
      } else {
        return false;
      }
    },
    isWriterUser() {
      return this.getUser.role === 'writer' ? true : false;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
      this.$buefy.toast.open('You are logged out');
    },
  },
};
</script>
