import { svgCreate } from "./svg-creater";
import { getPointsDistance, getRotate, getCurvePathD } from "./utils";

var Squares = function (params) {
    let self = this
    /**
     * 参数初始化
     */
    function _configInit (cfg) {
        self._container = cfg.container || document.body
        self._size = cfg.size || [3, 3]        
        self._width = cfg.width || _container.offsetWidth
        self._height = cfg.height || _container.offsetHeight
        self._innerWidth = cfg.innerWidth || (self._width / self._size[0] * 0.6)
        self._innerHeight = cfg.innerHeight || (self._height / self._size[1] * 0.6)
        self._showAnchor = cfg.showAnchor
        self._anchors = {
            start: Object.assign({}, { cx: 10, cy: 10, stroke: 'none', class: 'anchor-start', fill: 'red', r: 3 }, cfg.anchors.start),
            end: Object.assign({}, { cx: 10, cy: 10, stroke: 'none', class: 'anchor-end', fill: 'blue', r: 3 }, cfg.anchors.end)
        }
        self._fill = cfg.fill || 'gray'
    }
    /**
     * svg初始化
     */
    function _svgInit () {
        self.svg = svgCreate({
            width: self._width,
            height: self._height,
            size: self._size,
            showAnchor: self._showAnchor,
            anchors: self._anchors,
            fill: self._fill
        })
        self._arrowPath = self.svg.querySelector('path.curve-path')
        self._arrowPathGroup = self.svg.querySelector('g.arrow-group')
        self._arrowPathAnimate = self.svg.querySelector('animate.path-animate')
        self._startAnchor = self.svg.querySelector('circle.anchor-start')
        self._endAnchor = self.svg.querySelector('circle.anchor-end')
        self._container.appendChild(self.svg)
    }
    /**
     * 绘制箭头
     */
    function drawArrow (p) {
        var realAnchor = getArcAnchor(p[0], p[1])
        // 起始点坐标
        let start = realAnchor[0]
        let end = realAnchor[1]

        // 更新锚点位置
        if (self._showAnchor) {
            self._startAnchor.setAttribute('cx', start.x)
            self._startAnchor.setAttribute('cy', start.y)
            self._endAnchor.setAttribute('cx', end.x)
            self._endAnchor.setAttribute('cy', end.y)
        }

        // 箭头所在容器的x、y方向的长度
        let gWidth = getPointsDistance(start, end)
        let gHeight = 10 // 箭头高度

        // 起点位置
        let startFlag = end.x - start.x >= 0
        // 顺逆时针
        let arcFlag = end.y - start.y >= 0

        // 设置曲线path
        let cuevePathD = getCurvePathD(gWidth, gHeight, startFlag, arcFlag)
        this._arrowPathAnimate.setAttribute('to', cuevePathD)
       
        // 触发animate
        this._arrowPathAnimate.beginElement()
        
        var rotate = startFlag ? 0 : 180 // 这是曲线走向
        this._arrowPath.style.transform = 'rotateX(' + rotate + 'deg)'
        var transform = ''

        transform += 'translateX(' + (start.x) + 'px) translateY(' + (start.y - gHeight) + 'px) '
        // 设置旋转量
        var gRotateX = startFlag ? 0 : 180
        var gRotateY = startFlag ? 0 : 180
        var gRotateZ = getRotate(start, end)
        transform += 'rotateX(' + gRotateX + 'deg) ' + 'rotateY(' + gRotateY + 'deg) ' + 'rotateZ(' + gRotateZ + 'deg) '
        // 设置偏移量（这里有一个很诡异的bug, todo....）
        setTimeout(() => {
            self._arrowPathGroup.style.opacity = 1
            self._arrowPathGroup.style.transform = transform
        }, 100);
    }
    /**
     * 将方块的序数、转化成真实坐标
     */
    function _getPosition (p) {
        var singleSquareWidth = self._width / self._size[1]
        var singleSquareHeight = self._height / self._size[0]
        return {
            x: p[0] * singleSquareWidth + singleSquareWidth / 2,
            y: p[1] * singleSquareHeight + singleSquareHeight / 2
        }
    }
    /**
     * 获得两点箭头的起止锚点(正方形模型)
     */
    function getArcAnchor (p1, p2) {
        // 起始点的真实坐标
        var realP1 = _getPosition(p1)
        var realP2 = _getPosition(p2)
        // 起始点连线的中点
        let center = {
            x: (realP1.x + realP2.x) / 2,
            y: (realP1.y + realP2.y) / 2
        }
        // 获得每个方块的所有锚点 (待优化...)
        var p1AnchorArray = _getAnchorArray(realP1)
        var lenArr = p1AnchorArray.map((anchor, index) => {
            return getPointsDistance(center, anchor)
        })
        var lenArrSorted = JSON.parse(JSON.stringify(lenArr)).sort((a, b) => {
            return a - b
        })[0]
        var index = lenArr.indexOf(lenArrSorted)
        let startAnchor = p1AnchorArray[index]

        // 获得每个方块的所有锚点 (待优化...)
        var p2AnchorArray = _getAnchorArray(realP2)
        var lenArr = p2AnchorArray.map((anchor, index) => {
            return getPointsDistance(center, anchor)
        })
        var lenArrSorted = JSON.parse(JSON.stringify(lenArr)).sort((a, b) => {
            return a - b
        })[0]
        var index = lenArr.indexOf(lenArrSorted)
        let endAnchor = p2AnchorArray[index]
        return [startAnchor, endAnchor]
    }
    /**
     * 根据矩形，获得其八个锚点
     */
    function _getAnchorArray (realP1) {
        var { x, y } = realP1
        var halfW = self._innerWidth / 2
        var halfH = self._innerHeight / 2
        return [
            { x: x - halfW, y: y - halfH },
            { x: x, y: y - halfH },
            { x: x + halfW, y: y - halfH },

            { x: x - halfW, y: y },
            { x: x + halfW, y: y },

            { x: x - halfW, y: y + halfH },
            { x: x, y: y + halfH },
            { x: x - halfW, y: y + halfH }
        ]
    }
    _configInit(params)
    _svgInit()

    this.drawArrow = drawArrow
}

export default Squares
