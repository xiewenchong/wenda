<template>
  <div class="tab-bar">
    <van-tabbar route active-color="#07c160" inactive-color="#000" fixed border>
      <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/login" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  data() {
    return {
      // tabs: [
      // 	{
      // 		label: "首页",
      // 		icon: "icon-weibo",
      // 		name: "home"
      // 	},
      // 	{
      // 		label: "我的",
      // 		icon: "icon-weibo",
      // 		name: "my"
      // 	}
      // ],
      // tabBar: sessionGetItem('tabBar') || 'home'
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  watch: {
    // '$route' (to, from) {
    //     if (["home", "my"].includes(to.name)) {
    //         this.tabBar = to.name;
    //     }
    // }
  },
  methods: {
    // clickHandler(routerName) {
    //     this.tabBar = routerName;
    //     this.$router.push({ name: routerName });
    // }
  }
};
</script>

<style lang="scss" scoped>
.van-tabbar {
  height: 60px;
}
</style>
