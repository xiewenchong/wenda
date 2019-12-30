<template>
  <div class="login-page"></div>
</template>

<script>
import { NumberKeyboard } from "vant";
export default {
  name: "home",
  components: {
    [NumberKeyboard.name]: NumberKeyboard
  },
  data() {
    return {
      show: true
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
