
// ref: https://umijs.org/config/
export default {
  // publicPath: '/src/',
  targets: {
    ie: 9
  },
  disableCSSModules: true,
  base: '/selfcare/',
  history: 'hash',
  devtool: 'source-map',
  cssnano: {
    // css压缩
    mergeRules: false,
  },
  theme: {
    "@primary-color": "#7331A5",
    "@font-family": "QuicksandRegular",
    "headding-color": '#595959'
  },
  proxy: {
    '/api': {
      target: 'http://172.16.22.226:8080/selfcare',
      // target: 'http://10.45.105.16:8083/',
      // target: 'http://10.45.19.20:8083/selfcare',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true, // 启用后自动配置 babel-plugin-import 实现 antd 和 antd-mobile 的按需编译，并且内置 antd 和 antd-mobile 依赖，无需手动在项目中安装。
      dva: {
        // 开启dva
        hmr: true, // 启用 dva 的 hmr
      },
      dynamicImport: {
        loadingComponent:'./components/Loading'
      },
      title: 'NBE8848',
      dll: true,
      routes: {
        exclude: [],
      },
      targets: {
        ie: 9
      },
      // hardSource: true,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
}
