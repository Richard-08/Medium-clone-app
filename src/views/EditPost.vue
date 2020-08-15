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
        <button type="submit" class="button is-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'edit-post',
  data() {
    return {
      title: '',
      description: '',
      post: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const post = await this.$store.dispatch('fetchPostById', id);

    this.title = post.title;
    this.description = post.description;
    this.post = post;
  },
  methods: {
    async onSubmit() {
      const formData = {
        ...this.post,
        title: this.title,
        description: this.description,
        updatedAt: new Date(),
      };
      
      await this.$store.dispatch('updatePost', formData);
      console.log('ok');

      this.title = '';
      this.description = '';
      this.$router.push('/');
    },
  },
};
</script>
