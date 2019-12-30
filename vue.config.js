const path = require("path");
const IS_PROD = process.env.NODE_ENV === "production";

const CompressionPlugin = require("compression-webpack-plugin"); //gzip压缩插件

function resolve(dir) {
  return path.join(__dirname, dir);
}

//----------------------------------------------------------------------------------------------
module.exports = {
  runtimeCompiler: true, // 使用运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 开启生产环境SourceMap，设为false打包时不生成.map文件
  lintOnSave: false, // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可

  //本地开发服务器------------------------------------------------------------------------
  devServer: {
    open: false, // 是否自动打开浏览器页面
    host: "0.0.0.0", // 指定使用一个 host，默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: "http://api.zhuishushenqi.com"
  },

  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });

    // cdn配置cdn预加载使用-------------------------------------------------------------------
    const externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      vant: "vant"
    };
    const cdn = {
      // 开发环境
      dev: {
        css: ["https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css"],
        js: []
      },
      // 生产环境
      build: {
        css: ["https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css"],
        js: [
          "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
          "https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
          "https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js",
          "https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
          "https://cdn.jsdelivr.net/npm/vant@2.2.10/lib/vant.min.js"
        ]
      }
    };
    config.externals(externals);
    config.plugin("html").tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
    //----cdn---------------------------------------------------------------------------------

    //---------------compression-webpack-plugin插件  开启gzip压缩-start------------------------
    if (IS_PROD) {
      // #region 启用GZip压缩
      config.plugin("compression").use(CompressionPlugin, {
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      });
    } //----------------compression-webpack-plugin插件  开启gzip压缩-end---------------------------

    //---svg loader配置-start-------------------------------------------------------------------
    const svgRule = config.module.rule("svg"); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    //---svg loader配置-end----------------------------------------------------------------------

    //----------------设置路劲名-start-----------------------------------------------------------
    config.resolve.alias
      .set("@", resolve("src"))
      .set("~assets", resolve("src/assets"))
      .set("~common", resolve("src/common"))
      .set("~components", resolve("src/components"))
      .set("~store", resolve("src/store"));
    //----------------设置路劲名-end-------------------------------------------------------------
  },

  // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {},
  css: {
    loaderOptions: {
      sass: {
        prependData: `
			@import "~@/common/style/mixin.scss";
			@import "~@/common/style/_var.scss";
				`
      }
    }
  }
};
