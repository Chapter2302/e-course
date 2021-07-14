const moduleUser = {
    namespaced: true,
    state: () => ({
        id: "",
        fullname: "",
        avatar: "",
        role: "",
    }),
    mutations: {
        setUser(state, data) {
            const { id, fullname, avatar, role } = data
            state.id = id
            state.fullname = fullname
            state.avatar = avatar,
            state.role = role
        }
    },
    actions: {

    },
    getters: {
        getUser(state) {
            return {
                id: state.id,
                fullname: state.fullname,
                avatar: state.avatar,
                role: state.role,
            }
        }
    }
}

export default moduleUser