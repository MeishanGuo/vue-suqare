
/**
 * 点到直线的距离
 */
export function getDistanceToLine(p1, p2, p3) {
    var len;
    //如果p1.x==p2.x 说明是条竖着的线
    if (p1.x - p2.x == 0) {
        len = Math.abs(p3.x - p1.x)
    }
    else {
        var A = (p1.y - p2.y) / (p1.x - p2.x)
        var B = p1.y - A * p1.x

        len = Math.abs((A * p3.x + B - p3.y) / Math.sqrt(A * A + 1))
    }
    return len
}

/**
 * 获得两点之间的距离
*/
export function getPointsDistance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}
