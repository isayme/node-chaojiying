import axios from 'axios'
import { createHash } from 'crypto'

export interface UploadProcessingReq {
  user: string
  // 密码可以是明文，或者用参数pass2用户密码的md5值(32位小写)
  pass?: string
  // 密码的md5值(32位小写)
  pass2?: string
  softid: string
  codetype: string
  len_min?: number
  userfile?: Buffer
  // 不包含base64图片字符串前缀，即需要去掉类似 'data:image/png;base64,' 这部分前缀。
  file_base64?: string
}

/**
 * 推荐处理流程: if (err_no == 0) {识别结果 = pic_str} else {错误代码 = err_no}
 */
export interface UploadProcessingResp {
  // 错误码，0 表示成功
  err_no: number
  // 中文描述的返回信息
  err_str: string
  // 图片标识号，或图片id号
  pic_id: string
  // 识别出的结果
  pic_str: string
  // md5校验值,用来校验此条数据返回是否真实有效
  md5: string
}

function md5(v: string): string {
  return createHash('md5').update(v).digest().toString('hex')
}

export async function uploadProcessing(
  req: UploadProcessingReq,
): Promise<UploadProcessingResp> {
  let {
    user,
    pass,
    pass2 = '',
    softid,
    codetype,
    len_min = 0,
    userfile,
    file_base64,
  } = req

  // 密码统一md5后传输
  if (pass) {
    pass2 = md5(pass)
  }

  // 图片内容base64编码后传输
  if (userfile) {
    file_base64 = userfile.toString('base64')
  }

  const reqBody = {
    user,
    pass2,
    softid,
    codetype,
    len_min,
    file_base64,
  }

  const res = await axios.request({
    method: 'POST',
    url: 'https://upload.chaojiying.net/Upload/Processing.php',
    data: reqBody,
  })
  return res.data
}
