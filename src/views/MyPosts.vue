<template>
  <div class="container" style="padding: 60px 0">
    <PostCard v-for="post in items" :key="post.id" :post="post" />

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
</template>

<script>
import PostCard from '../components/PostCard';
import { mapGetters } from 'vuex';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'my-posts',
  mixins: [paginationMixin],
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    await this.$store.dispatch('fetchPosts');

    this.setPagination(this.filteredPosts);
  },
  computed: {
    ...mapGetters(['getUser', 'getPosts']),
    filteredPosts() {
      return this.getPosts.filter(p => p.userId === this.getUser.id).map((p) => {
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
  components: {
    PostCard,
  },
};
</script>
