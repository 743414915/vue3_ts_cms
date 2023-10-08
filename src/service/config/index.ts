export const BASE_URL = "http://codercba.com:8000";
export const TIME_OUT = 10000;

// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE) // 应用运行的模式
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

// 3.通过创建.env文件来创建变量
// 要以VITE_开头
console.log(import.meta.env.VITE_URL);
console.log(import.meta.env.VITE_BA);
