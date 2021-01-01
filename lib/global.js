const _ = require('lodash');
const utils = require('./utils');
const md5 = require('md5');

const APP_VERSION = "2.2.0";
const DEVICE_ID = "c22e8b48-8ac6-3f93-98e2-27f63c3add7d";
const DEVICE_NAME = "Samsung Galaxy C7 Pro";

const init = () => {
  if (_.isEmpty(process.env.COOKIE_STRING)) {
    console.error("环境变量 COOKIE_STRING 未配置，退出...");
    process.exit();
  };

  console.log(`DEVICE_ID: ${DEVICE_ID}, DEVICE_NAME: ${DEVICE_NAME}`);

  global.getHeader = () => {
    let randomStr = utils.randomString(6);
    let timestamp = Math.floor(Date.now() / 1000)
  
    // iOS sign
    let sign = md5(`salt=b253c83ab2609b1b600eddfe974df47b&t=${timestamp}&r=${randomStr}`);

    return {
      'Cookie': process.env.COOKIE_STRING,
      'Content-Type': 'application/json',
      'User-Agent': 'okhttp/4.8.0',
      'Referer': 'https://app.mihoyo.com',
      'x-rpc-channel': 'miyousheluodi',
      'x-rpc-device_id': DEVICE_ID,
      'x-rpc-app_version': APP_VERSION,
      'x-rpc-device_model': 'Galaxy C7 Pro',
      'x-rpc-device_name': DEVICE_NAME,
      'x-rpc-client_type': '2', // 1 - iOS, 2 - Android, 4 - PC Web,5 - Mobile Web
      'DS': `${timestamp},${randomStr},${sign}`
      // 'DS': `1602569298,k0xfEh,07f4545f5d88eac59cb1257aef74a570`
    }
  }
}

module.exports = {
  init
}
