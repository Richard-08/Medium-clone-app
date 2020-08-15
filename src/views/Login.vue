<template>
  <form @submit.prevent="onSubmit">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Login</p>
      </header>

      <section class="card-content">
        <b-field label="Email">
          <b-input type="email" v-model="email"> </b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" password-reveal v-model="password">
          </b-input>
        </b-field>
      </section>

      <footer class="card-footer">
        <div class="card-footer-item">
          <button class="button is-primary" type="submit">Login</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      if (await this.$store.dispatch('login', formData)) {
        this.$router.push('/');
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `User with this email does not exist`,
          position: 'is-top',
          type: 'is-danger',
        });
      }
    },
  },
};
</script>
