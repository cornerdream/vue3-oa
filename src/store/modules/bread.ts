const user = {
    state: {
        breadListState: []
    },
    mutations: {
        breadListMutations(getters: { breadListState: any; }, list: any) {
            getters.breadListState = list;
        }
    },
}

export default user