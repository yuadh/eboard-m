import axios from "axios"
import { url } from "inspector"
import {getVal} from './aTools'
import {message} from 'antd'

let sendURL:string
let stInd:number
let pxInd:number
let rqMsg:any
let canvas:any
let srcImg:any
let c = canvas
let dispW = srcImg.width
let dispH = srcImg.height
let pArr = c.getContext('2d').getImageData(0, 0, dispW, dispH) 
let nArr = new Array(dispW*dispH)
let index = 0
//字符转
 function byteToStr(v:any) {
  return String.fromCharCode((v & 0xf) + 97, ((v >> 4) & 0xf) + 97)
}
//看不懂
 function wordToStr(v:any) {
  return byteToStr(v & 0xff) + byteToStr((v >> 8) & 0xff)
}
function u_next() {
  pxInd = 0
  u_send('NEXT_', true)
}
function u_done() {
  return u_send('SHOW_', true)
}
 function u_send(cmd:any,next:any){
  axios.post(
    sendURL+cmd
  ).then((res)=>{
    console.log(res)
    if (stInd === 0) return u_data(nArr,0,0,50)
    if (stInd === 1) return u_next()
    if (stInd === 2) return u_data(nArr, 3, 50, 50)
    if (stInd === 3) return u_done()
  }).catch((err)=>{
    console.log(err)
  })
  if(next){
    stInd++
  }
  return 
}

 function u_show(a:any, k1:number, k2:number) {
  var x = '' + (k1 + (k2 * pxInd) / a.length)
  if (x.length > 5) x = x.substring(0, 5) //取5位进度数，包括小数点
  return u_send(rqMsg + wordToStr(rqMsg.length) + 'LOAD_', pxInd >= a.length)
}

 function u_data(a:any, c:number, k1:number, k2:number) {
  rqMsg = ''

  if (c == -1) {
    while (pxInd < a.length && rqMsg.length < 1000) {
      var v = 0
      for (var i = 0; i < 16; i += 2) if (pxInd < a.length) v |= a[pxInd++] << i
      rqMsg += wordToStr(v)
    }
  } else if (c == -2) {
    while (pxInd < a.length && rqMsg.length < 1000) {
      var v = 0
      for (var i = 0; i < 16; i += 4) if (pxInd < a.length) v |= a[pxInd++] << i
      rqMsg += wordToStr(v)
    }
  } else {
    //非特殊尺寸默认进入此代码块，分块传输每次大小不超过1000byte ~1byte=8bit
    while (pxInd < a.length && rqMsg.length < 1000) {
      var v = 0 //0000 0000
      for (var i = 0; i < 8; i++)
        // 像素代表色不等于0黑色时 需要把V转成 0x1111 1111
        if (pxInd < a.length && a[pxInd++] != c) v |= 128 >> i
      //将像素点转为 byte 为单位的字符串
      rqMsg += byteToStr(v)
      // console.log(v + '???????????')
    }
  }

  // console.log(rqMsg)
  return u_show(a, k1, k2)
}



export function uploadImage(epdInd:number){
  message.warn('错错错!!!')
  for (var y = 0; y < dispH; y++){
    for (var x = 0; x < dispW; x++, index++) {
      nArr[index] = getVal(pArr, index << 2)
    }
  }
  pxInd = 0
  stInd = 0  
  // 暂时仅支持 4.2寸黑白和7.5寸黑白红
  u_send('EPD' + String.fromCharCode(epdInd + 97) + '_',false)
}

