<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <h2 class="title is-3">{{ post.title }}</h2>
        </div>
      </div>

      <div class="content">
        {{ post.description }}
      </div>
      <footer class="card-footer">
        <div class="card-footer-item" style="padding:5px">
          <div class="card-footer-item">
            <p class="title is-5" style="color: grey">{{ post.authorName }}</p>
          </div>
          <div class="card-footer-item">
            <p class="subtitle is-7" style="color: grey">
              {{ post.createAt | date('date') }}
            </p>
          </div>
        </div>

        <div
          class="card-footer-item"
          style="padding:5px"
          v-if="post.writer && post.isAuthor"
        >
          <div class="buttons">
            <router-link
              :to="{ name: 'Edit-Post', params: { id: post.id } }"
              class="button is-primary"
            >
              <i class="far fa-edit"></i> Edit
            </router-link>
          </div>
        </div>

        <div
          class="card-footer-item"
          style="padding:5px"
          v-if="post.writer && post.isAuthor"
        >
          <b-button type="is-danger" outlined @click="removePost(post.id)"
            ><i class="far fa-trash-alt"></i> Delete</b-button
          >
        </div>

        <div class="card-footer-item" style="padding:5px" v-if="!post.isAuthor">
          <b-button outlined @click="updateClaps(post.id)">
            <img src="../assets/img/clap.svg" alt="claps" />{{
              claps
            }}</b-button
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postcard',
  props: ['post'],
  data() {
    return {
      claps: this.post.claps,
    };
  },
  methods: {
    async removePost(id) {
      await this.$store.dispatch('removePost', id);
      this.$emit('remove-post');
    },
    async updateClaps(id) {
      if (this.post.guest) {
        this.$router.push('/login');
        this.$buefy.toast.open('You must be logged in to clap');
        return;
      }

      this.claps += 1;
      const post = await this.$store.dispatch('fetchPostById', id);
      const postData = {
        ...post,
        claps: this.claps,
        id,
      };

      await this.$store.dispatch('updatePost', postData);
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 30px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.07);
}

img {
  width: 20px;
  height: 20px;
}
</style>
