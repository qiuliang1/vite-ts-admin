export interface IConfig {
  env: string // 开发环境
  mock?: boolean // mock数据
  title: string // 项目title
  baseUrl?: string // 项目地址
  baseApi?: string // api请求地址
  APPID?: string // 公众号appId  一般放在服务器端
  APPSECRET?: string // 公众号appScript 一般放在服务器端
}

const dev: IConfig = {
  env: 'development',
  mock: false,
  title: '开发',
  baseUrl: 'http://localhost:8001', // 项目地址
  baseApi: 'https://baidu.com/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: 'wx123456778890',
  APPSECRET: 'xxx'
}

const prod: IConfig = {
  env: 'production',
  mock: false,
  title: '生产',
  baseUrl: 'https://www.xxx.com/', // 正式项目地址
  baseApi: 'https://www.baidu.com/api', // 正式api请求地址
  APPID: 'wx1234567890',
  APPSECRET: 'xxx'
}

export const config: IConfig = import.meta.env.MODE == 'development' ? dev : prod
