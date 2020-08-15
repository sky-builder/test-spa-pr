/**
 * 当页面过多时在开发环境下使用lazy-loading会导致热更新缓慢
 */

// 开发环境
const developImport = file => require(`@/views/${file}`).default;
// 测试及生产环境
const productionImport = file => () => import(`@/views/${file}`);

export { developImport, productionImport };
