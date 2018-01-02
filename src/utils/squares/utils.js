/**
* 获得两点之间的距离
*/
export function getPointsDistance (p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}

/**
 * 获得连点连线相对于x轴的夹角
 */
export function getRotate (p1, p2) {
    return Math.atan((p2.y - p1.y) / (p2.x - p1.x)) / Math.PI * 180
}

/**
 * 曲线path
 * @augments:w 箭头x轴方向的长度
 * @augments:h 箭头y轴方向的高度
 */
export function getCurvePathD (w, h) {
    var start = { x: 0, y: h }
    var end = { x: w, y: h }

    var topCtlPointTranslate = -w * 2.5 / 10 // 这个系数有待调整...
    var bottomCtlPointTranslate = -w * 2 / 10 // 这个系数有待调整...

    var path_d = 'M'
        // 上贝塞尔曲线起点（箭头起点）
        + start.x
        + ' '
        + start.y
        // 上贝塞尔曲线控制点
        + ' Q '
        + ((start.x + end.x) / 2)
        + ' '
        + ((start.y + end.y) / 2 + topCtlPointTranslate)
        + ' '
        // 上贝塞尔曲线终点
        + (end.x - 12)
        + ' '
        + (end.y - 14)
        // 箭头上顶点
        + ' L '
        + (end.x - 10)
        + ' '
        + (end.y - 20)
        // 终点（箭头终点）
        + ' L '
        + (end.x)
        + ' '
        + (end.y)
        // 箭头下顶点
        + ' L '
        + (end.x - 20)
        + ' '
        + (end.y + 4)
        // 下贝塞尔曲线起点
        + ' L '
        + (end.x - 14)
        + ' '
        + (end.y - 2)
        // 下贝塞尔曲线控制点
        + ' Q '
        + ((start.x + end.x) / 2)
        + ' '
        + ((start.y + end.y) / 2 + bottomCtlPointTranslate)
        + ' '
        // 下贝塞尔曲线终点（箭头起点）
        + start.x
        + ' '
        + start.y
    return path_d
}