<template>
  <div class="login-page">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        @focus="focus"
        @blur="blur"
      />
    </van-cell-group>

    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
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
  methods: {
    focus() {
        this.show = true;
    },
    blur() {
        this.show = false;
    },
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast("删除");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

