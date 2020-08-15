module.exports = {
  api: [
    {
      name: 'hfsbe',
      host: 'http://testhfs-be.yunxiao.com'
    },
    {
      name: 'hfscsq',
      host: 'http://testhfs-csq.yunxiao.com'
    }
  ],
  cookie: 'yz-test-session-id',
  // 埋点配置
  trackPoint: {
    feMonitor: '//testfemonitor.iyunxiao.com', // trackPonit 配置获取地址
    projectId: '5d64f7a70000052a623d4f26', // 项目 ID
    baseURL: '//testfemonitor.iyunxiao.com', // 上报地址
    time: 1000, // 上报间隔
    sKey: 'FE_TrackPoint', // 上报 key，可根据项目修改
    eventType: ['click', 'hover'] // 事件类型
  }
};
