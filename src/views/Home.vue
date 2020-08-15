<template>
  <div class="home">
    <div class="container" style="padding: 60px 0">
      <PostCard
        v-for="post in items"
        :key="post.id"
        :post="post"
        @remove-post="updatePagination"
      />

      <b-pagination
        @change="pageChange"
        :total="total"
        :current.sync="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :click-handler="pageChange"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostCard from '../components/PostCard';
import { mapGetters } from 'vuex';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'Home',
  mixins: [paginationMixin],
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapGetters(['getUser', 'getPosts']),
    filteredPosts() {
      return this.getPosts.map((p) => {
        return {
          ...p,
          isAuthor: p.userId === this.getUser.id,
          writer: this.getUser.role === 'writer' ? true : false,
          reader: this.getUser.role === 'reader' ? true : false,
          guest: !this.getUser.role,
        };
      });
    },
  },
  methods: {
    async fetchPosts() {
      await this.$store.dispatch('fetchPosts');
      this.setPagination(this.filteredPosts);
    },
    async updatePagination() {
      await this.fetchPosts();
    },
  },
  components: {
    PostCard,
  },
};
</script>
