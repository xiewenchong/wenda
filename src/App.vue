<template>
    <div id="app">
        <Layout>
            <router-view />
        </Layout>
    </div>
</template>

<script>
import Layout from "@/components/layouts";
export default {
    name: "App",
    components: {
        Layout
    }
};
</script>

<style lang="scss">
@import "./common/style/normalize.scss";
@import "./common/style/reset.scss";
@import "./common/style/common.scss";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
