module.exports = {
  api: [
    {
      name: 'hfsbe',
      host: 'http://hfs-be.yunxiao.com'
    },
    {
      name: 'hfscsq',
      host: 'http://hfs-csq.yunxiao.com'
    }
  ],
  cookie: 'yz-session-id',
  // 埋点配置
  trackPoint: {
    feMonitor: '//fe-monitor.iyunxiao.com', // trackPonit 配置获取地址
    projectId: 'xxxxxxx', // 项目 ID
    baseURL: '//fe-monitor.iyunxiao.com', // 上报地址
    time: 1000, // 上报间隔
    sKey: 'FE_TrackPoint', // 上报 key，可根据项目修改
    eventType: ['click', 'hover'] // 事件类型
  }
};
