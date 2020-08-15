export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            const users = await fetch('http://localhost:3000/users')
                .then(response => response.json());
            const user = users.find(u => u.login === email && u.password === password);

            if (user) {
                commit('setUser', user);
            }
            return user;
        },
        async logout({commit}) {
            commit('clearUser');
        }
    }
}