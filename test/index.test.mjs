import { expect } from 'chai';
import { describe, it } from "mocha";
import nock from 'nock';
import { uploadProcessing } from '../dist/esm/index.js';

describe('Test Chaojiying With ESM', function () {
  afterEach(function () {
    nock.cleanAll()
  })

  it('request', async function () {
    nock('https://upload.chaojiying.net')
      .persist()
      .post('/Upload/Processing.php')
      .reply(200, { err_no: 0 })

    const res = await uploadProcessing({
      user: 'test',
      pass: 'test',
      codetype: 'test',
      softid: 'test',
    })

    console.log(res)
    expect(res.err_no).eq(0)
  })
})