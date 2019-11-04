<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <div class="swiper-component">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-button
      @click="pipei"
      round
      :loading="loadingBtn"
      type="info"
      :loading-text="loadingText"
    >{{loadingText}}</van-button>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(item, index) in newsTab" :key="index" :title="item">
        <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Search, Tab, Tabs, List, Cell } from "vant";
export default {
  name: "home",
  data() {
    return {
      images: [
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3634344654,3568188661&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2377920388,2816391736&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2963384237,3210936401&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=373422083,3975093058&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1045669529,1465761358&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2123005640,47882692&fm=26&gp=0.jpg"
      ],
			newsTab: ["热门提问", "热门搜索", "满意排行"],
			active: 0,
      value: "",
      loadingText: "匹配",
			loadingBtn: false,
			list: [],
      listLoading: false,
      finished: false
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell
  },
  methods: {
    pipei() {
      this.loadingBtn = true;
      this.loadingText = "加载中...";
      setTimeout(() => {
        this.loadingBtn = false;
        this.loadingText = "确认";
      }, 2000);
		},
		onLoad() {
			// 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
		}
  },
  mounted() {
    // this.$toast('asdasd')
  }
};
</script>
<style lang="scss" scoped>
.van-button {
  width: 150px;
}
.van-list {
	height: 206px;
	overflow: scroll;
}
</style>

