<template>
    <div id="app">
        <DashBoard v-if="!active_app" />
        <ActiveWidget v-if="active_app" />
    </div>
</template>

<script>
import DashBoard from "./components/DashBoard.vue";
import ActiveWidget from "./components/ActiveWidget.vue"

let url_string = window.location.href
let url = new URL(url_string);
let page = url.searchParams.get("page");

export default {
    name: "App",
    components: {
        DashBoard,
        ActiveWidget
    },
    data() {
        return {
            active_app: false
        };
    },
    mounted() {
        if(page === 'active') {
            this.active_app = true
        }
    },
    methods: {

    }
};
</script>

<style lang="scss">
#app {
  font-family: Arial;
}
</style>
