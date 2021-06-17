const user = {
    state: {
        breadListState: []
    },
    mutations: {
        breadListMutations(getters, list) {
            getters.breadListState = list;
        }
    },
}

export default user