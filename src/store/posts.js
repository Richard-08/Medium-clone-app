export default {
    state: {
        posts: []
    },
    actions: {
        async fetchPosts({ dispatch, commit }) {
            try {
                const posts = await fetch('http://localhost:3000/posts')
                    .then(response => response.json());
                commit('setPosts', posts);
            } catch (error) {
                throw error;
            }
        },
        async createPost({ dispatch, commit }, data) {
            try {
                await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                dispatch('fetchPosts');
            } catch (error) {
                throw error;
            }
        },
        async removePost({ dispatch, commit }, id) {
            try {
                await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE'
                });
                dispatch('fetchPosts');
            } catch (error) {
                throw error;
            }
        },
        async fetchPostById({ dispatch, commit }, id) {
            try {
                return await fetch(`http://localhost:3000/posts/${id}`)
                    .then(response => response.json());
            } catch (error) {
                throw error;
            }
        },
        async updatePost({ dispatch }, data) {
            try {
                await fetch(`http://localhost:3000/posts/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                dispatch('fetchPosts');
            } catch (error) {
                throw error;
            }
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        }
    },
    getters: {
        getPosts(state) {
            return state.posts;
        }
    }
}