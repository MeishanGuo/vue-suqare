/* eslint-disable */

/*!
 * @beisen/vue-squares v0.1.0
 * (c) 2017 guomeishan
 * Released under the ISC License.
 * WARNING: The file is automatically generated, not manually modified. 
 * 警告: 该文件为脚本自动生成，切勿手动修改 
 */

import chart_222358b0ea2911e7bdc17b6a0acbefc3 from './components/vue-squares.vue'

let vueComponentTemplate = {
  components: {},
  version: '0.1.0'
}
vueComponentTemplate.components[chart_222358b0ea2911e7bdc17b6a0acbefc3.name] = chart_222358b0ea2911e7bdc17b6a0acbefc3

vueComponentTemplate.install = function (Vue) {
  Object.keys(this.components).forEach(name => {
    Vue.component(name, this.components[name])
  })
}
export default vueComponentTemplate
