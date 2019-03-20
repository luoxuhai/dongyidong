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
