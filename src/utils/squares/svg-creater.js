

// 生成随机id, 防止多个渐变在同一个页面，出现样式冲突。
const gradientId = 'gradientId_' + Math.random().toString(36).substr(6)

/**
 * 创建svg节点
 * @param {*} params 
 */
function createSvg (cfg) {
    let svg = createSvgElement('svg')
    const svgAttr = {
        width: cfg.width,
        height: cfg.height,
        version: '1.1',
        xmlns: "http://www.w3.org/2000/svg",
        ref: 'svgbody',
        viewBox: '0,0, ' + cfg.width + ',' + cfg.height,
        preserveAspectRatio: 'xMidYMid slice'
    }
    Object.keys(svgAttr).forEach(attrName => {
        svg.setAttribute(attrName, svgAttr[attrName])
    })
    return svg
}
/**
 * 创建defs渐变
 */
function createDefs(cfg) {
    let g = createSvgElement('g')
    g.classList.add('defs-group')
    let defs = createSvgElement('defs')

    let linearGradientNode = createSvgElement('linearGradient')

    const linearGradientAttr = {
        id: gradientId,
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '0%'
    }
    setAttrs(linearGradientNode, linearGradientAttr)

    var stops = [
        {
            offset: '0%',
            'stop-color': cfg.fill,
            'stop-opacity': 0.2
        },
        {
            offset: '100%',
            'stop-color': cfg.fill,
            'stop-opacity': 1
        }
    ]
    stops.forEach(stop => {
        let stopNode = createSvgElement('stop')
        setAttrs(stopNode, stop)
        linearGradientNode.appendChild(stopNode)
    })
    
    defs.appendChild(linearGradientNode)
    g.appendChild(defs)

    return g
}

/**
 * createArrow
*/
function createArrow(params) {
    let g = createSvgElement('g')
    g.classList.add('arrow-group')
    let pathNode = createSvgElement('path')
    const pathAttrs = {
        d: '',
        class: 'curve-path',
        stroke: 'none',
        fill: 'url(#' + gradientId + ')'
    }
    setAttrs(pathNode, pathAttrs)
    
    var animateNode = createSvgElement('animate')
    const animateAttr = {
        class: 'path-animate',
        attributeName: 'd',
        from: 'M0 20 Q 10 1.2382849098223438 8 6 L 10 0 L 20 20 L 0 24 L 6 18 Q 10 4.990627927857876 0 20',
        to: 'M0 20 Q 113.13104265629306 -36.56552132814653 214.26208531258612 6 L 216.26208531258612 0 L 226.26208531258612 20 L 206.26208531258612 24 L 212.26208531258612 18 Q 113.13104265629306 -25.252417062517225 0 20',
        begin: 'indefinite',
        fill: 'freeze',
        dur: '0.8s',
        calcMode: 'spline',
        keySplines: '.51,1.58,.52,.77'
        // repeatCount: 
        // restart: 'whenNotActive'
    }
    setAttrs(animateNode, animateAttr)
    pathNode.appendChild(animateNode)
    g.appendChild(pathNode)
    return g
}

/**
 *  设置节点属性
 */
 function setAttrs(node, attrs) {
     Object.keys(attrs).forEach(attr => {
        node.setAttribute(attr, attrs[attr])
     })
 }

/**
 * 创建锚点标记
*/
function createAnchor(cfg) {
    let g = createSvgElement('g')
    g.classList.add('anchor-group')
    var anchors = [cfg.anchors.start, cfg.anchors.end]
    anchors.forEach(anchor => {
        let circleNode = createSvgElement('circle')
        setAttrs(circleNode, anchor)
        g.appendChild(circleNode)
    })
    return g
}
/**
 * 创建svg元素
 */
function createSvgElement(nodeName) {
    return document.createElementNS('http://www.w3.org/2000/svg', nodeName)
 }

export function svgCreate(cfg) {
    let svg = createSvg(cfg)

    let defs = createDefs(cfg)
    svg.appendChild(defs)

    let arrow = createArrow(cfg)
    svg.appendChild(arrow)

    if (cfg.showAnchor) {
        let anchors = createAnchor(cfg)
        svg.appendChild(anchors)
    }
    return svg
}
