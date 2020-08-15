<template>
  <div class="container" style="margin: 20px auto">
    <h2 class="title is-4">New post</h2>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <input
          class="input"
          type="text"
          placeholder="Post title"
          required
          v-model="title"
        />
      </div>

      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Post text"
            rows="10"
            required
            v-model="description"
          ></textarea>
        </div>
      </div>

      <div class="buttons">
        <button class="button is-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'create-post',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async onSubmit() {
      const formData = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        claps: 0,
        createAt: new Date(),
        updatedAt: new Date(),
        userId: this.getUser.id,
        authorName: this.getUser.name,
      };

      await this.$store.dispatch('createPost', formData);
      console.log('ok');

      this.title = '';
      this.description = '';
    },
  },
};
</script>
