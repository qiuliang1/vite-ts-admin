import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/

export default ({ mode }) =>
  defineConfig({
    server: {
      port: 8888,
      proxy: {
        '/api': {
          target: 'https://c4b2e5aa-a74e-49dc-b481-cf1b07c89556.bspapp.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index.css`
            },
            resolveComponent: (name) => {
              return `ant-design-vue/es/${name}`
            }
          }
        ]
      }),
      Components({
        resolvers: [AntDesignVueResolver()]
      }),
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: resolve(__dirname, './path/to/src/locales/**')
      })
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/_variables.scss";`
        }
      }
    },
    build: {
      rollupOptions: {
        external: [
          'element-plus' // ignore react stuff
        ]
      }
    },
    base: mode === 'development' ? '/' : './', //此时把环境打包路径也配置好，避免生产环境打包出现白屏
    resolve: {
      alias: {
        '@': resolve(__dirname, '/src'),
        '#': resolve(__dirname, '/src/types')
      }
    }
  })
