export const selectItemMixin = {
    props: {
        title: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            default: []
        }
    },
    methods: {
        selectItem(e) {
            const index = e.currentTarget.dataset.index
            this.$emit("select", index)
        }
    }
}

export const pagingLoadingMixin = {
    onPullDownRefresh() {
        this.currentPage = 1
        this.loadMore()
    },
    onReachBottom() {
        this.loadMore(true)
    },
    onLoad() {
        this.loadMore()
    },
    onUnload() {
        Object.assign(this.$data, this.$options.data())
    }
}
