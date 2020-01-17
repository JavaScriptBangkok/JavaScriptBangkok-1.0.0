export default ({ Vue, options, router, siteData }) => {
  Vue.prototype.$flags = new Vue({
    data: {
      preview: false
    }
  });
};
