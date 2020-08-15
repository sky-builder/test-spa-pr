// 生成 deviceId
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const getBaseInfo = () => {
  const { width, height } = window.screen; // window.screen 为特殊类型，必须拼成对象
  return {
    // 业务基础数据
    userId: '',
    studentId: '',
    schoolId: '',
    grade: '',

    // 设备相关基础信息
    appId: '', // hfsh5、hfsxs、hfsjz、hfsfx 等
    appVersion: '',
    appPackageId: '',
    deviceId: generateUUID(),
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    osName: Utils.getOS(),
    osVersion: Utils.getOSVersion(),
    screenWidth: width,
    screenHeight: height
  };
};

const getActionTpl = () => {
  return {
    lng: '',
    lat: '',
    deviceNetwork: '',
    deviceCarrier: '',
    eventId: '',
    eventTime: '',
    resourceId: '',
    resourceModule: '',
    stayTime: '',
    action: ''
  };
};

const setStorage = (trackPointKey, trackPoints) => {
  window.localStorage.setItem(
    trackPointKey,
    JSON.stringify(trackPoints)
  );
};

const getStorage = trackPointKey => {
  const trackPoints = window.localStorage.getItem(trackPointKey);
  return trackPoints
    ? JSON.parse(trackPoints)
    : [];
};

const clearStorage = (trackPointKey, degradationTime) => {
  if (degradationTime) {
    const trackPoints = getStorage(trackPointKey);
    console.log(trackPoints);
    const newTrackPoints = trackPoints.filter((item) => item.eventTime > degradationTime);
    console.log(newTrackPoints);
    setStorage(trackPointKey, newTrackPoints);
  } else {
    window.localStorage.removeItem(trackPointKey);
  }
};

const write2Storage = (trackPointKey, trackInfo) => {
  const trackPoints = getStorage(trackPointKey);
  trackPoints.push({ ...trackInfo });
  setStorage(trackPointKey, trackPoints);
};

export { getStorage, write2Storage, clearStorage, getBaseInfo, getActionTpl };
