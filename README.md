[![NPM Version](https://img.shields.io/npm/v/chaojiying?style=flat-square)](https://www.npmjs.com/package/chaojiying)

# 关于

Node SDK for [超级鹰](https://www.chaojiying.com/).

# 使用样例

```
import { uploadProcessing } from 'chaojiying'

async function main() {
  // 见官方文档 https://www.chaojiying.com/api-5.html
  let res = await uploadProcessing({
    user: '账号',
    pass: '密码',
    softid: '',
    codetype: '',
    file_base64: ''
  })
}
```
