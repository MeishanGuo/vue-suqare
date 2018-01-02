<template>
  <div class='vue-squares-wrap' :style='wrapStyle' >
    <div class="suqare-bg-box">
      <!--真实的dom结构-->
      <template v-for="(item, index) in squareList">
        <div 
          class="square-item" 
          :key="index" 
          @click="setArrayPosition(item, $event)" 
          :style="{width: (((1 / size[1]) * 100) + '%'), height: (((1 / size[0]) * 100) + '%')}"
          >
          <span>{{item}}</span>
          </div>
      </template>
      <!--svg-->
    </div>
    <div class='svg-box' ref="svgContainer" :style='wrapStyle'></div>
  </div>
</template>

<script>
  import Squares from '../utils/squares'
  export default {
    name: 'vue-squares',
    props: {},
    data () {
      var search = location.search
      search = search.replace('?', '')
      var array = search.split('&')
      var _props = {}
      array.forEach(param => {
        var _param = param.split('=')
        _props[_param[0]] = JSON.parse(_param[1]) || _param[1]
      })

      var _defalutsProps = {
        width: 450,
        height: 450,
        size: [3,3],
        arrowPosition: [[0,3],[2,2]]
      }
      return Object.assign({}, _defalutsProps, _props)
    },
    watch: {
      arrowPosition () {
       this.drawDefaultArrow()
      }
    },
    computed: {
      wrapStyle () {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },
      squareList () {
        var list = []
        for(var i = 0; i < this.size[0]; i++) { // 行
          for(var j = 0; j < this.size[1]; j++) { // 列
            list.push([j, i])
          }
        }
        return list
      }
    },
    methods: {
      setArrayPosition (item, eve) {
        // 待优化...
        if (this.arrowPosition.length == 2) {
          this.arrowPosition = []
          this.arrowPosition.push(item)
          document.querySelectorAll('.active').forEach(node => {
            node.classList.remove('active')
          })
        } else {
          this.arrowPosition.push(item)          
        }
        eve.currentTarget.classList.add('active')        
      },
      // 绘制默认的箭头
      drawDefaultArrow () {
        if (this.arrowPosition.length == 2) {
          this.squares.drawArrow(this.arrowPosition)
        }
      }
    },
    mounted () {
      var config = {
        container: this.$refs.svgContainer,
        showAnchor: true, // 是否显示锚点 defalut true
        anchors: { // 锚点样式，标准的svg attr即可
          start: {
            fill: 'red',
            r: 3
          },
          end: {
            fill: 'blue',
            r: 3
          }
        },
        fill: 'orange', // 箭头填充色（会自动做成渐变）
        animate: true, // 是否开启箭头绘制动效 (todo...)
        width: this.$refs.svgContainer.offsetWidth || 450, // m * n 总宽度
        height: this.$refs.svgContainer.offsetHeight || 450, // m * n 总高度
        innerWidth: this.$refs.svgContainer.offsetWidth / this.size[0] * 0.7, // 小方块内容区域大小，用于锚点的定位
        innerHeight: this.$refs.svgContainer.offsetHeight / this.size[1] * 0.7, // 小方块内容区域大小，用于锚点的定位
        size: this.size // m * n m行，n列
      }
      this.squares = new Squares(config)
      this.drawDefaultArrow()
    }
  }
</script>

<style scoped>
  document, html, body, head , div{
    margin: 0;
    padding: 0;
  }

  .vue-squares-wrap {
    position: relative;
    margin: 0 auto;
    border: 1px solid #ebf1f5;
  }
  
  .suqare-bg-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .square-item {
    border: 2px solid #ffffff;
    background: #ebf1f5;
    box-sizing: border-box;
    float: left;
    /* code for test */
  }

  .svg-box {
    position: relative;
    left: 0;
    top: 0;
    pointer-events: none;
    /* code for test */
    /* background: #ffa50026; */
  }
  .arrow-group {
    transform-origin: left bottom 0;
    /* opacity: 0; */
  }
  .curve-path {
    transform-origin: center center;
  }
  .square-item span {
    display: block;
    background:#d8e9f8;
    width: 70%;
    height: 70%;
    margin: 15% 15%;
    /* code for test */
    font-size: 12px;
    text-align: center;
    color:#b9dfff;
    cursor: pointer;
  }
  .square-item.active span {
    background: #aad7ff;
  }
</style>
