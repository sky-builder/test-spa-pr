import {
  write2Storage,
  getBaseInfo,
  getActionTpl,
  getStorage,
  clearStorage
} from './trackUtils';

let TrackPoint = {};
const trackInfoTpl = getActionTpl();
// 1. 获取配置的埋点 list
const getTrackPonit = () => {
  const { Vue, options } = Vo;

  return Vue.http
    .get(`/v2/monitor/${options.projectId}/track_ponint`, { baseURL: options.feMonitor })
    .then(resp => {
      if (resp.code === 0) {
        TrackPoint = resp.data;
      }
    });
};

// 埋点队列
let msgs;
// 避免多次无效请求
let flag = 1;

// 2. 获取上传埋点的权限
const getPermission = () => {
  const { Vue, options } = Vo;
  msgs = getStorage(options.sKey);
  // 如果埋点队列没有数据，则不上报
  if (msgs.length === 0) return;
  // 如果上次请求未返回，则不上报
  if (flag > 1) return;
  flag++;

  const baseInfo = getBaseInfo();
  // 注意: deviceId 在获取 baseInfo 时生成，两个接口的 deviceId 要保持一致
  const deviceId = baseInfo.deviceId;
  Vue.http
    .post('/v2/proxy/permission', { deviceId }, { baseURL: options.baseURL })
    .then(resp => {
      if (resp.code === 0 && resp.data.permission === 1) {
        sendTrackInfo(resp.data.uploadKey, baseInfo);
      } else if (resp.code === 2) {
        clearStorage(options.sKey, resp.data.degradationTime);
        sendTrackInfo(resp.data.uploadKey, baseInfo);
      }
    }).catch(() => {
      // 防止请求失败，无法发送
      flag = 1;
    });
};
// 3. 上传埋点数据
const sendTrackInfo = (uploadKey, baseInfo) => {
  const { Vue, options } = Vo;
  // 部分用户信息需要埋点使用者挂载到 window.trackInfo 下
  const { userId, schoolId, grade } = window.trackInfo || {};
  const params = {
    uploadKey, // 权限验证所需  key
    msgId: `${baseInfo.deviceId}-${+new Date()}`,
    msgs,
    baseInfo: {
      ...baseInfo,
      userId,
      schoolId,
      grade
    }
  };
  Vue.http
    .post('/v2/proxy/action', params, { baseURL: options.baseURL })
    .then(res => {
      if (res.code === 0) clearStorage(options.sKey);
    }).finally(() => {
      flag = 1;
    });
};

let Vo = {};
// 埋点上报 每一分钟上报一次
const initReporter = () => {
  setInterval(getPermission, Vo.options.time || 60000);
};

// 注册普通事件
const initiativeTrigger = (el, trackInfo) => {
  el.addEventListener(
    trackInfo.action,
    () => {
      write2Storage(Vo.options.sKey, { ...trackInfo });
    },
    false
  );
};

// 注册滚动事件
const initAddListener = el => {
  window.addEventListener('scroll', () => {
    let contentTop = el.offsetHeight;
    let contentHeight = el.getBoundingClientRect().top;
    let bodyClientHeight = window.screen.height;
    let uplength = (
      ((bodyClientHeight - contentHeight) / contentTop) *
      100
    ).toFixed(2);
    if (userScrollPercentage < +uplength) {
      userScrollPercentage = +uplength;
    }
  });
};

// 用户屏幕滚动的深度
let userScrollPercentage = 0;
// 滚动类（深度）埋点数据上报
const reloadWritePoint = binding => {
  const { id, resourceId } = binding.value;
  let trackInfo = Object.assign(trackInfoTpl, Utils.cloneDeep(TrackPoint[id]));
  if (trackInfo.action === 'stroke_up') {
    if (userScrollPercentage > 100) {
      trackInfo.eventId = trackInfo.eventId + '_' + 100;
    } else {
      trackInfo.eventId = trackInfo.eventId + '_' + userScrollPercentage;
    }
    trackInfo.resourceId = resourceId || '';
    write2Storage(Vo.options.sKey, { ...trackInfo });
    userScrollPercentage = 0;
  }
};

const bindEvent = (el, binding, options) => {
  const { id, resourceId, point } = binding.value;
  let trackInfo = Object.assign(trackInfoTpl, Utils.cloneDeep(TrackPoint[id]));
  if (trackInfo) {
    trackInfo.eventTime = Date.parse(new Date());
    // 所有埋点详情以下划线分隔存入 event_id 字段

    if (options.eventType.includes(trackInfo.action)) { // 符合配置的 action(click/hover) 注册事件
      trackInfo.resourceId = resourceId || '';
      initiativeTrigger(el, { ...trackInfo });
    } else if (trackInfo.action === 'show') { // 展示类埋点，出现直接上报埋点
      trackInfo.resourceId = resourceId || '';
      write2Storage(options.sKey, { ...trackInfo });
    } else if (trackInfo.action === 'stroke_up') { // 滚动类埋点
      // 注册滚动事情，记录滚动数据
      initAddListener(el);
      // 页面销毁时，上报滚动数据
      window.addEventListener('beforeunload', () => {
        reloadWritePoint(binding);
      });
    } else if (trackInfo.action === 'stroke_initial') { // 首屏高度，记录首屏用户可看到的范围
      trackInfo.resourceId = resourceId || '';
      trackInfo.eventId = trackInfo.eventId + '_' + window.screen.height;
      write2Storage(options.sKey, { ...trackInfo });
    }
  } else {
    point.eventTime = Date.parse(new Date());
    if (options.eventType.includes(point.action)) {
      initiativeTrigger(el, { ...point });
    }
  }
};

export default {
  install(Vue, options) {
    // 初始化参数
    Vo = { Vue, options };
    // 初始化轮训上报模块
    initReporter();
    // 埋点指令收集部分
    let getTrackPonitFlag = 0;
    Vue.directive('stat', {
      bind(el, binding) {
        // 检查远程配置是否拿到
        if (Object.keys(TrackPoint).length > 0) {
          bindEvent(el, binding, options);
        } else if (!getTrackPonitFlag) { // 避免重复发送 getTrackPonit 请求
          getTrackPonitFlag = 1;
          getTrackPonit().then(() => {
            bindEvent(el, binding, options);
          });
        } else {
          setTimeout(() => {
            bindEvent(el, binding, options);
          }, 3000);
        }
      },
      unbind(el, binding) {
        reloadWritePoint(binding);
        window.removeEventListener('scroll', () => { });
        window.removeEventListener('beforeunload', () => { });
      }
    });
  }
};
