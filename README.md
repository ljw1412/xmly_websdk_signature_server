# [ node | koa2 ] 喜马拉雅JSSDK签名服务
支持sdk版本: @xmly-fem/web-jssdk v1.1.1

[喜马拉雅web-jssdk相关文档](https://s1.xmcdn.com/sr012018/web-jssdk-doc/1.1.1/_book/doc/prepare/get-signature.html)

## 配置
在 config.js 中配置 app_secret (在喜马拉雅开发平台-管理中心-应用中心-网页应用中查看)
``` javascript
module.exports = {
  app_secret: ''
}
```

## 本地开发
### 启动脚本
`npm run dev` or `yarn run dev`

默认端口3111

### 网页端
添加 @xmly-fem/web-jssdk 依赖
``` javascript
import { config, XMLY } from '@xmly-fem/web-jssdk'

config({
  app_key: '', // 必传，根据实际情况填写
  sig_url: '//localhost:3111/signature', // 必传
  device_id: 'dasffasddafs12345', // 必传
  timeout: 10 * 1000,
  debug: true
})

const xmly = new XMLY()

// 获取分类列表
xmly
  .getCategories()
  .then(({ code, data }) => {
    if (code === 0) {
      console.log(data)
    }
  })
  .catch(error => {
    console.log(error)
  })
```
