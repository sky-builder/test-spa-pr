
export function getCharLength(str) {
  var len = 0;
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    var c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

/**
* 判断复杂数据类型
* @param  {[object, string]} 要判断的对象和类型
* @return {[boolean]} 是否属于
*/
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};

/**
* 深度克隆
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
export function cloneDeep(parent) {
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对 Date 对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index !== -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };

  return _clone(parent);
};

/**
 * 动态插入script标签，返回promise
 * @param {*} url: 要加载的代码url
 */
export function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.className = 'dynamic-script';
    script.type = 'text/javascript';
    if (script.readyState) { // IE
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else { // Others
      script.onload = function() {
        return resolve();
      };
    }
    script.onerror = function() {
      return reject(Error('script onerror'));
    };
    script.src = url;
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);
  });
}

/**
 * 获取设备操作系统
 */
export function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = '';

  if (~macosPlatforms.indexOf(platform)) {
    os = 'Mac OS';
  } else if (~iosPlatforms.indexOf(platform)) {
    os = 'iOS';
  } else if (~windowsPlatforms.indexOf(platform)) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
};

/**
 * 获取设备操作系统版本
 */
export function getOSVersion() {
  let os = getOS();
  let osVersion = 'unknown';
  const nVer = navigator.appVersion;
  const nAgt = navigator.userAgent;
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS':
    case 'Mac OS X':
      osVersion = /Mac OS X (10[._\d]+)/.exec(nAgt)[1];
      break;

    case 'Android':
      osVersion = /Android ([._\d]+)/.exec(nAgt)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  return osVersion;
};
