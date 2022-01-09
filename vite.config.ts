import { resolve } from 'path'
// import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import convue from 'convue'
// import styleImport from 'vite-plugin-style-import'
import {
  base,
  primaryColor,
  // textColor,
  defaultLocale,
  i18nUseCookie
  // mockServerProdEnable,
} from './src/config/constants'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default () => {
  // ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: base,
    plugins: [
      vue(),
      vueJsx(),
      ...convue({
        head: {
          title: 'Vite TSX Admin'
        },
        loading: primaryColor,
        progress: {
          color: primaryColor
        },
        page: {
          router: {
            history: 'hash',
            scrollBehavior: () => {
              return { x: 0, y: 0 }
            }
          }
        },
        locale: {
          defaultLocale,
          useCookie: i18nUseCookie
        },
        styles: ['ant-design-vue/dist/antd.less', '@convue-lib/styles'],
        modules: ['ant-design-vue']
      }),
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: resolve(__dirname, './path/to/src/locales/**')
      })
    ],
    // build: {
    //   rollupOptions: {
    //     external: [
    //       'element-plus' // ignore react stuff
    //     ]
    //   }
    // }
    server: {
      port: 8888
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '/src')
      }
    }
  }
}
// export default ({ mode }) =>
//   defineConfig({
//     plugins: [
//       vue(),
//       vueJsx(),
//       styleImport({
//         libs: [
//           {
//             libraryName: 'element-plus',
//             esModule: true,
//             ensureStyleFile: true,
//             resolveStyle: (name) => {
//               return `element-plus/lib/theme-chalk/${name}.css`
//             },
//             resolveComponent: (name) => {
//               return `element-plus/lib/${name}`
//             }
//           }
//         ]
//       }),
//       AutoImport({
//         resolvers: [ElementPlusResolver()]
//       }),
//       Components({
//         resolvers: [ElementPlusResolver()]
//       }),
//       ...convue({
//         head: {
//           title: 'Vite TSX Admin'
//         },
//         loading: '#5B8FF9',
//         progress: {
//           color: '#5B8FF9'
//         },
//         page: {
//           router: {
//             history: 'hash',
//             scrollBehavior: () => {
//               return { x: 0, y: 0 }
//             }
//           }
//         },
//         locale: {
//           defaultLocale: 'zh-CN',
//           useCookie: {
//             cookieKey: 'vite-ts-admin_i18n',
//             expires: 365
//           }
//         },
//         modules: ['element-plus']
//       })
//     ],
//     build: {
//       rollupOptions: {
//         external: [
//           'element-plus' // ignore react stuff
//         ]
//       }
//     },
//     base: mode === 'development' ? '/' : './', //此时把环境打包路径也配置好，避免生产环境打包出现白屏
//     server: {
//       port: 8888
//     },
//     resolve: {
//       alias: {
//         '@': resolve(__dirname, '/src')
//       }
//     }
//   })
