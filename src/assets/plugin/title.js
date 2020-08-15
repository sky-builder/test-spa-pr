
function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `爱云校 | ${title}`;
    } else {
      document.title = '爱云校';
    }
  }
};

export default clientTitleMixin;
