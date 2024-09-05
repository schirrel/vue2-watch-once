export const watchOnceMixin = {
    data() {
        return {
            watchers: {}
        }
    },
    methods: {
        watchOnce({ watchTarget, callback, options }) {
            const watchId = window.crypto.randomUUID();
            this.watchers[watchId] = this.$watch(watchTarget, (newVal, oldVal) => {
                callback(newVal, oldVal);
                this.unwatch(watchId)
            }, options || {});
        },
        watchOnceTrue({ watchTarget, callback, options }) {
            const watchId = window.crypto.randomUUID();
            this.watchers[watchId] = this.$watch(watchTarget, (newVal, oldVal) => {
                callback(newVal, oldVal);
                if (newVal === true) {
                    this.unwatch(watchId)
                }
            }, options || {});
        },
        unwatch(watchId) {
            if (this.watchers[watchId]) {
                this.watchers[watchId]();
                delete this.watchers[watchId];
            }
        }
    }


}
