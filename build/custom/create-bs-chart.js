#!/usr/local/bin/node

const v1 = require('uuid').v1
const fs = require('fs')
const path = require('path');
require('shelljs/global');
const pack = require('../../package.json')

const version = process.env.VERSION || pack.version
const components = []
const cmpDir = path.join(__dirname, '..', '..', 'src', 'components')
const cmpPrefix = './components/'

let lines = []

lines.push('/* eslint-disable */\n')

var banner =
  '/*!\n' +
  ' * ' + pack.name + ' v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' ' + pack.author.name + '\n' +
  ' * Released under the ' + pack.license + ' License.\n' +
  ' * WARNING: The file is automatically generated, not manually modified. \n' +
  ' * 警告: 该文件为脚本自动生成，切勿手动修改 \n' +
  ' */\n'
lines.push(banner)

ls('-R', cmpDir).filter(function (file) {
  return file.match(/\.vue$/)
}).forEach(function (file) {
  const fileName = file.match(/(\/)?(\w+)\.vue/)[2]
  var cmpName = 'chart_' + v1().replace(/-/g, '')
  lines.push(`import ${cmpName} from '${cmpPrefix}${file}'`)
  components.push(cmpName)
})


lines.push(`
let vueComponentTemplate = {
  components: {},
  version: '${version}'
}`)

components.forEach(function (cmp) {
    lines.push(`vueComponentTemplate.components[${cmp}.name] = ${cmp}`)
})

lines.push(`
vueComponentTemplate.install = function (Vue) {
  Object.keys(this.components).forEach(name => {
    Vue.component(name, this.components[name])
  })
}`)

lines.push('export default vueComponentTemplate\n')

fs.writeFile(path.join(cmpDir, '..', 'index.js'), lines.join('\n'), (err) => {
  if (err) throw err
  console.log('the file of global components is saved!')
})
