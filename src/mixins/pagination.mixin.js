import _ from 'lodash';

export default {
    data() {
        return {
            total: 0,
            current: +this.$route.query.page || 1,
            perPage: 10,
            rangeBefore: 3,
            rangeAfter: 1,
            order: 'is-centered',
            size: '',
            isSimple: false,
            isRounded: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            allItems: [],
            items: [],
        }
    },
    methods: {
        setPagination(allItems) {
            this.allItems = _.chunk(allItems, this.perPage);
            this.total = allItems.length;
            this.pageCount = _.size(this.allItems);
            this.items = this.allItems[this.current - 1] || this.allItems[0];
        },
        pageChange(page) {
            this.$router.push(`${this.$route.path}?page=${page}`);
            this.items = this.allItems[page - 1] || this.allItems[0];
        },
    },

}