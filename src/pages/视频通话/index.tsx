
//这个框架主要使用腾讯音视频
import { Button } from 'antd';
import React from 'react';
import TRTC from 'trtc-js-sdk';
import LibGenerateTestUserSig from './lib-generate-test-usersig.min.js'
function RadioDemo() {

  function genTestUserSig(userID: any) {
    /**
     * 腾讯云 SDKAppId，需要替换为您自己账号下的 SDKAppId。
     *
     * 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav ) 创建应用，即可看到 SDKAppId，
     * 它是腾讯云用于区分客户的唯一标识。
     */
    const SDKAPPID = 1400649698;

    /**
     * 签名过期时间，建议不要设置的过短
     * <p>
     * 时间单位：秒
     * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
     */
    const EXPIRETIME = 604800;

    /**
     * 计算签名用的加密密钥，获取步骤如下：
     *
     * step1. 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav )，如果还没有应用就创建一个，
     * step2. 单击“应用配置”进入基础配置页面，并进一步找到“帐号体系集成”部分。
     * step3. 点击“查看密钥”按钮，就可以看到计算 UserSig 使用的加密的密钥了，请将其拷贝并复制到如下的变量中
     *
     * 注意：该方案仅适用于调试Demo，正式上线前请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。
     * 文档：https://cloud.tencent.com/document/product/647/17275#Server
     */
    const SECRETKEY = '0cfde170186bd9031484c9e6759803a17c7b39d4f93b4eb5ba42e8bacd4fd454';

    // a soft reminder to guide developer to configure sdkAppId/secretKey
    // if (SDKAPPID === '' || SECRETKEY === '') {
    //   alert(
    //     '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
    //       '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js'
    //   );
    // }
    const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
    const userSig = generator.genTestUserSig(userID);
    return {
      sdkAppId: SDKAPPID,
      userSig: userSig
    };
  }

  const sdkAppId = 1400649698
  const SECRETKEY = '0cfde170186bd9031484c9e6759803a17c7b39d4f93b4eb5ba42e8bacd4fd454';
  const userId = '1234'
  const { userSig } = genTestUserSig(userId)

  //创建一个音视频
  const client: any = TRTC.createClient({ mode: 'live', sdkAppId, userId, userSig });


  //加入房间
client
  .join({ roomId:1234 })
  .then(() => {
    console.log('进房成功');
  })
  .catch((error:any) => {
    console.error('进房失败 ' + error);
  });
//创建本地音视频流
const localStream = TRTC.createStream({ userId, audio: true, video: true });

//初始化本地音视频流
localStream
  .initialize()
  .then(() => {
    console.log('初始化本地流成功');
  })
  .catch((error:any) => {
    console.error('初始化本地流失败 ' + error);
  });

  

//订阅远端音视频流
client.on('stream-added', (event:any) => {
  const remoteStream = event.stream;
  console.log('远端流增加: ' + remoteStream.getId());
  //订阅远端流
  client.subscribe(remoteStream);
});
client.on('stream-subscribed', (event:any) => {
  const remoteStream = event.stream;
  console.log('远端流订阅成功：' + remoteStream.getId());
  // 播放远端流
  remoteStream.play('remote_stream-' + remoteStream.getId());
});

//播放音视频流
// 在本地流初始化成功的回调中，或远端流订阅成功事件回调中，通过调用play()方法在网页中播放音视频。
// play方法接受一个 div 元素 ID 作为参数，SDK 内部会在该 div 元素下自动创建相应的音视频标签并在其上播放音视频。
localStream
  .initialize()
  .then(() => {
    console.log('初始化本地流成功');
    // 'local_stream' 是在 DOM 中的一个 div 标签的 ID
    localStream.play('local_stream');
  })
  .catch((error:any) => {
    console.error('初始化本地流失败 ' + error);
  });


  // 远端流通过监听事件client.on('stream-added')获得，请在join()进房前注册该事件，确保您不会错过远端用户进房通知。
  //订阅远端流成功时播放远端流
  client.on('stream-subscribed', (event:any) => {
    const remoteStream = event.stream;
    console.log('远端流订阅成功：' + remoteStream.getId());
    // 播放远端流
    remoteStream.play('remote_stream-' + remoteStream.getId());
  });
  // 退出音视频通话房间
  // 通话结束时调用leave()方法退出音视频通话房间，整个音视频通话会话结束。

  client
  .leave()
  .then(() => {
    // 退房成功，可再次调用client.join重新进房开启新的通话。
  })
  .catch((error:any) => {
    console.error('退房失败 ' + error);
    // 错误不可恢复，需要刷新页面。
  });



  return (
    <> <div>
      <Button type="primary" id='local_stream'>播放</Button>
      <Button type="primary" id='remote_stream' >远端</Button>
      <Button type="primary" >退出</Button>
      <Button type="primary" ></Button>

    </div>
    </>
  )
}

export default RadioDemo