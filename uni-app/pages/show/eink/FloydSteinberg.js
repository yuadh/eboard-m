//返回代表rgb代表的颜色编码
export function getVal(p, i){
  //0x0000 0000 黑色
  //0x1111 1111 白色
  //0x0111 1111 灰色
  // 3：other
  if (p[i] == 0x00 && p[i + 1] == 0x00) return 0
  if (p[i] == 0xff && p[i + 1] == 0xff) return 1
  if (p[i] == 0x7f && p[i + 1] == 0x7f) return 2
  return 3
}

export function getVal_7color(p, i){
  if (p.data[i] == 0x00 && p.data[i + 1] == 0x00 && p.data[i + 2] == 0x00)
    return 0
  if (p.data[i] == 0xff && p.data[i + 1] == 0xff && p.data[i + 2] == 0xff)
    return 1
  if (p.data[i] == 0x00 && p.data[i + 1] == 0xff && p.data[i + 2] == 0x00)
    return 2
  if (p.data[i] == 0x00 && p.data[i + 1] == 0x00 && p.data[i + 2] == 0xff)
    return 3
  if (p.data[i] == 0xff && p.data[i + 1] == 0x00 && p.data[i + 2] == 0x00)
    return 4
  if (p.data[i] == 0xff && p.data[i + 1] == 0xff && p.data[i + 2] == 0x00)
    return 5
  if (p.data[i] == 0xff && p.data[i + 1] == 0x80 && p.data[i + 2] == 0x00)
    return 6
  return 7
}

// 设置canvas得到的ImageData的数据
// 查看ImageData的构造函数 一个像素点需要保证4*width*height 才不会报错
export function setVal(curPal, p, i, c) {
  // 将色位数组对应颜色填充到canvas的imageData中
  p.data[i] = curPal[c][0]
  p.data[i + 1] = curPal[c][1]
  p.data[i + 2] = curPal[c][2]
  p.data[i + 3] = 255
}

export function addVal(c, r, g, b, k) {
  return [c[0] + (r * k) / 32, c[1] + (g * k) / 32, c[2] + (b * k) / 32]
}

//根据算法返回gbk对比的参考值
export function getErr(r, g, b, stdCol) {
  r -= stdCol[0]
  g -= stdCol[1]
  b -= stdCol[2]
  return r * r + g * g + b * b
}

//根据算法饱和度对比返回rgb对应色位数组下标
export function getNear(curPal,r, g, b) {
  var ind = 0
  var err = getErr(r, g, b, curPal[0])
  for (var i = 1; i < curPal.length; i++) {
    var cur = getErr(r, g, b, curPal[i])
    if (cur < err) {
      err = cur
      ind = i
    }
  }
  return ind
}
// --------上传事件处理函数--------------


