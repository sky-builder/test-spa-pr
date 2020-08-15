# 埋点 plugin

## 使用

1.引入注册指令

```js
// src/views/main.js
import TrackPlugin from '@/assets/plugin/track';

// 埋点指令注册
Vue.use(TrackPlugin, feConfig.trackPoint);
```

2.配置埋点参数

```js
// src/feConfig/xxx.js

trackPoint: {
  feMonitor: '//testfemonitor.iyunxiao.com', // trackPonit 配置获取地址
  projectId: 'xxxxxxxxx', // 项目 ID
  baseURL: '//testlog-serv-v3.haofenshu.com', // 日志上报地址
  time: 1000, // 日志上报间隔
  sKey: 'FE_TrackPoint', // 本地 storge 缓存时的 key，可根据项目修改
  eventType: ['click', 'hover'] // 通过 addEventListener 注册的事件埋点动作
}
```

3.使用指令

```html
<div class="hello" v-stat="{ id : 'h5_xzxsjz_self_show' }">
    <!-- 内容 -->
</div>

```
