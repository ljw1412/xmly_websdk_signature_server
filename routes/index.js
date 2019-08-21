const config = require('../config')
const router = require('koa-router')()
const { URLSearchParams } = require('url')
const crypto = require('crypto')

router.post('/signature', async (ctx, next) => {
  let { params } = ctx.request.body
  params = JSON.parse(params)
  let list = []
  // 按照 key 字典排序
  Object.keys(params)
    .sort()
    .forEach(key => {
      list.push([key, params[key]])
    })

  // 将排序后的参数键值对用&拼接，即拼接成key1=val1&key2=val2&...
  const search = new URLSearchParams(list).toString()
  console.log('[search]', search)

  // 将上一步得到的字符串进行 Base64 编码（注意 Base64 编码时要设置字符集为 utf8），假设 Base64 编码后的字符串为 base64EncodedStr；
  const base64 = Buffer.from(search, 'utf8').toString('base64')
  console.log('[base64]', base64)

  // 用 app_secret 作为 HMAC-SHA1 哈希 key（即sha1Key），使用 sha1Key 对base64EncodedStr 进行 HMAC-SHA1 哈希得到字节数组（注意是字节数组，不要转成十六进制字符串，否则签名计算会出错；一般的 HMAC-SHA1 算法得到的结果是字节数组的十六进制表示，请务必留意这里和一般情况不太一样）
  const hmac = crypto.createHmac('sha1', config.app_secret)
  hmac.update(base64)
  const sha1ResultBytes = hmac.digest()
  console.log('[sha1]', sha1ResultBytes)

  // 对上面得到的 sha1ResultBytes 进行 MD5 得到 32 位字符串，即为 sig
  const md5 = crypto.createHash('md5')
  const signature = md5.update(sha1ResultBytes).digest('hex')
  console.log('[md5]', signature)

  ctx.body = { code: 0, message: '', signature }
})

module.exports = router
