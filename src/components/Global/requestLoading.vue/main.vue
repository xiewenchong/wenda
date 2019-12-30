<template>
  <div class="requestLoading.vue">
    <van-loading color="#1989fa" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "requestLoading.vue",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["requestLoading"])
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
