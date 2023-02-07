<template>
  <!-- pages/canvas/canvas.wxml -->
  <view>
    <orange-fullloading class="over" loadicon="/static/loading.gif" iconwidth="620" iconheight="620" textsize="40"
      :text="flag.tips" :loadshow="flag.loading"></orange-fullloading>
    <view v-if="flag.show" class="canvas-box" :style="{ opacity: flag.loading ? 0 : 1 }">
      <!-- 显示/辅助canvas -->
      <canvas class="canvas1" style="width: 400px; height: 300px;" canvas-id="fCanvas"
        :style="{ opacity: flag.loading ? 0 : 1 }"></canvas>
      <!-- 数据/赋值canvas -->
      <canvas class="canvas2" style="width: 400px; height: 300px;" canvas-id="mCanvas"
        :style="{ opacity: flag.loading ? 0 : 1 }"></canvas>
    </view>
    <view v-else class="instead">请先选择图片</view>
    <view class="list-box">
      <!-- 选择模板 -->
      <view class="btn" @click="uploadImageData">
        <view>请选择投送模板</view>
        <view class="loadImg">选择模板</view>
      </view>
      <!-- 显示文字 -->
      <view class="btn">
        <view>请输入显示文字</view>
        <input class="select_y" v-model="fontData" type="text" maxlength="10" placeholder="请输入显示文字" />
      </view>
      <!-- 选择字号 -->
      <view class="btn">
        <view>请输入显示字号</view>
        <input class="select_y" type="number" v-model="fontSize" maxlength="2" placeholder="请输入显示字号" />
      </view>
      <!-- 选择颜色 -->
      <view class="btn">
        <view>请输入文字颜色</view>
        <picker @change="bindPickerChange" :value="fontColor" :range="array">
          <view>当前选择：{{ array[fontColor]}}</view>
        </picker>
      </view>
      <!-- 相关操作 -->
      <view class="btn2">
        <view class="onSave" @click="showBit()">效果生成</view>
        <view class="onLoad" @click="sendEquipment()">点击投送</view>
      </view>
      <view v-if="flag.update"></view>
    </view>
  </view>
</template>

<script>
import { einkColorArr, epdArr } from './eink/eink.js'
import { apiGetEquipment, apiChangeEquipment, apiChangeScreen } from '../../apis/room.js'
import { setVal, getNear, addVal, getVal } from './eink/FloydSteinberg.js'
import { getUserLoginState } from '../../utils/cookieUtils'
var pxInd = 0, stInd = 0;
var sendURL = '';
var rqMsg = '';
var fArr = [];
var mArr = [];
export default {
  data() {
    return {
      id: 0,
      edata: {},
      flag: {
        loading: false,
        tips: '加载中...',
        show: false,
        loaded: false,
      },
      array: ['黑色', '白色'],
      colInd: [], //色位数组,
      epdInd: [],//设备index
      fontSize: 40,
      fontColor: 0,
      uploadImgPath: '',
      uploadNetSrc: '',
      showImgURL: '',
      fontData: 'yuadh',
      windowW: 0,
      windowH: 0,
      count: 0,
      Cookie: ''
    }
  },
  onLoad(options) {
    this.Cookie = getUserLoginState()
    fArr = []
    mArr = []
    uni.getSystemInfo({
      success: (res) => {
        this.windowW = res.windowWidth
        this.windowH = res.windowHeight
        this.epdInd = epdArr[0][2] & 0xfe
        this.colInd = einkColorArr[0]
      }
    })
    this.getDataInit(options.id ? options.id : 5)
  },
  onUnload() {
    let temp = this.edata
    temp.equipmentStatus = 0
    apiChangeEquipment(temp)
  },
  methods: {
    bindPickerChange(e) {
      this.fontColor = e.detail.value
    },
    async getDataInit(id) {
      try {
        var res = await apiGetEquipment(id)
        if (res.data.code == '0') {
          this.edata = res.data.data

        } else {
          uni.showToast({
            title: res.code.message,
            duration: 2000,
            icon: 'none'
          });
        }
      } catch (e) {

      }
    },
    //选择相册或相机图片
    uploadImageData() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为 img 标签的 src 属性显示图片
          const tempFilePaths = res.tempFilePaths[0]
          this.uploadImgPath = tempFilePaths

          if (!tempFilePaths) {
            return
          }
          this.imageProduct()
        }
      })
    },
    imageProduct() {
      this.flag = {
        ...this.flag,
        show: true,
        loading: true,
        tips: '图片生成中...'
      }
      var fCanvas = uni.createCanvasContext('fCanvas')
      this.canvasFresh(fCanvas)
      fCanvas.draw(true)
      this.flag = {
        ...this.flag,
        loading: false
      }
      fCanvas.draw(true, setTimeout(() => {
        this.showBit()
      }, 100))

    },
    //转墨水屏二进制图片数据
    toEBdata() {

      uni.canvasGetImageData({
        canvasId: 'mCanvas',
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        success: (res) => {
          fArr = res.data


          this.dataChangeB2()
        },
      })
    },
    dataChangeB2() {//抖动算法——效果更接近原图
      var aInd = 0
      var bInd = 1
      var index = 0
      var errArr = new Array(2)
      errArr[0] = new Array(400)
      errArr[1] = new Array(400)
      for (var i = 0; i < 400; i++) {
        errArr[bInd][i] = [0, 0, 0]
      }
      for (var j = 0; j < 300; j++) {
        var y = 0 + j
        if (y < 0 || y >= 300) {//如果超出待提取的图片，填充默认数据
          for (var i = 0; i < 400; i++, index += 4) {
            setVal(this.colInd, mArr, index, (i + j) % 2 === 0 ? 1 : 0)
          }
          continue
        }
        aInd = ((bInd = aInd) + 1) & 1
        for (var i = 0; i < 400; i++) {
          errArr[bInd][i] = [0, 0, 0]
        }
        for (var i = 0; i < 400; i++) {
          var x = 0 + i
          if (x < 0 || x >= 400) {//如果超出待提取的图片，填充默认数据
            setVal(this.colInd, mArr, index, (i + j) % 2 === 0 ? 1 : 0)
            index += 4
            continue
          }
          var pos = (y * 400 + x) * 4
          var old = errArr[aInd][i]
          var r = fArr[pos] + old[0]
          var g = fArr[pos + 1] + old[1]
          var b = fArr[pos + 2] + old[2]
          var colVal = this.colInd[getNear(this.colInd, r, g, b)]
          mArr[index++] = colVal[0]
          mArr[index++] = colVal[1]
          mArr[index++] = colVal[2]
          mArr[index++] = 255
          r = r - colVal[0]
          g = g - colVal[1]
          b = b - colVal[2]

          if (i == 0) {
            errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 7.0)
            errArr[bInd][i + 1] = addVal(errArr[bInd][i + 1], r, g, b, 2.0)
            errArr[aInd][i + 1] = addVal(errArr[aInd][i + 1], r, g, b, 7.0)
          } else if (i == 400 - 1) {
            errArr[bInd][i - 1] = addVal(errArr[bInd][i - 1], r, g, b, 7.0)
            errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 9.0)
          } else {
            errArr[bInd][i - 1] = addVal(errArr[bInd][i - 1], r, g, b, 3.0)
            errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 5.0)
            errArr[bInd][i + 1] = addVal(errArr[bInd][i + 1], r, g, b, 1.0)
            errArr[aInd][i + 1] = addVal(errArr[aInd][i + 1], r, g, b, 7.0)
          }
        }
      }


      var fCanvas = uni.createCanvasContext('fCanvas')
      fCanvas.clearRect(0, 0, 400, 300)
      const dat = new Uint8ClampedArray(mArr)
      uni.canvasPutImageData({
        canvasId: 'fCanvas',
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        data: dat,
        success: (res) => {

          this.flag = {
            ...this.flag,
            loading: false
          }
        },
        fail: (err) => {



        }
      })
    },
    showBit() {
      if (!this.uploadImgPath) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //发送图片
      this.flag = {
        ...this.flag,
        loading: true
      }
      fArr = new Array(400 * 300)
      mArr = new Array(400 * 300)
      var mCanvas = uni.createCanvasContext('mCanvas')
      this.canvasFresh(mCanvas)
      mCanvas.draw(true, setTimeout(() => {
        this.toEBdata()
      }, 100))
    },
    canvasFresh(queryCanvas) {
      queryCanvas.clearRect(0, 0, 400, 300)
      queryCanvas.save()
      queryCanvas.drawImage(this.uploadImgPath, 0, 0, 400, 300)
      queryCanvas.restore()
      queryCanvas.setFontSize((this.fontSize / 375) * 400)
      this.fontColor === 0 ? queryCanvas.setFillStyle('black') : queryCanvas.setFillStyle('white')
      queryCanvas.setTextBaseline('middle')
      queryCanvas.setTextAlign('center')
      queryCanvas.fillText(this.fontData, 400 / 2, 300 / 2)
    },
    async sendEquipment() {

      if (!this.uploadImgPath) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none',
          duration: 2000
        })
        return
      }
      pxInd = 0
      stInd = 0
      this.flag = {
        ...this.flag,
        loading: true,
        tips: '正在连接服务器'
      }
      this.edata = {
        ...this.edata,
        equipmentStatus: 1
      }
      try {
        await this.uploadEqShowImg()
        let res = await apiChangeEquipment(this.edata)
        if (res.data.code == '0') {
          uni.request({
            url: 'http://' + this.edata.equipmentIp + '/' + 'EPDn_', //仅为示例，并非真实的接口地址
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {

              let index = 0
              for (var y = 0; y < 300; y++) {
                for (var x = 0; x < 400; x++, index++) {
                  mArr[index] = getVal(mArr, index << 2)
                }
              }
              // 
              // 
              if (stInd == 0) return this.u_data(mArr, 0, 0, 100)
              if (stInd == 1) return this.u_done()
            },
            fail: (res) => {

              let index = 0
              for (var y = 0; y < 300; y++) {
                for (var x = 0; x < 400; x++, index++) {
                  mArr[index] = getVal(mArr, index << 2)
                }
              }
              // 
              // 
              if (stInd == 0) return this.u_data(mArr, 0, 0, 100)
              if (stInd == 1) return this.u_done()
            }
          })
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }

      } catch (e) {
        return;
      }
    },
    //图片上传至服务器
    uploadEqShowImg() {
      uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        destWidth: 400,
        destHeight: 300,
        canvasId: 'fCanvas',
        fileType: 'jpg',
        quality: 1,
        success: (res) => {
          uni.uploadFile({
            filePath: res.tempFilePath,
            name: 'image',
            header: {
              Cookie: this.Cookie
            },
            url: 'http://127.0.0.1:7529/api/upload/uploadPic',
            success: async (result) => {
              this.uploadNetSrc = result.data
              let req = {
                equipmentScreen: result.data,
                id: this.edata.id
              }
              let res = await apiChangeScreen(req)
            }
          })

        }
      })
    },
    // 发送方法
    byteToStr(v) {
      return String.fromCharCode((v & 0xf) + 97, ((v >> 4) & 0xf) + 97)
    },
    wordToStr(v) {
      return this.byteToStr(v & 0xff) + this.byteToStr((v >> 8) & 0xff)
    },
    //小数点2位
    floor(num, n) {
      return parseInt(num * Math.pow(10, n)) / Math.pow(10, n)
    },
    //发送
    u_send(cmd, next) {

      uni.request({
        url: 'http://' + this.edata.equipmentIp + '/' + cmd, //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: async (res) => {
          this.count = this.count + 1
          this.flag = {
            ...this.flag,
            tips: '上传进度 ' +
              (this.floor(((this.count + 1) / 96) * 100, 2) > 100
                ? 100
                : this.floor(((this.count + 1) / 96) * 100, 2)) +
              '%'
          }

          if (next || this.count >= 97) {
            this.flag = {
              ...this.flag,
              loading: false
            }
            stInd = stInd + 1
          }

          if (stInd == 0) return this.u_data(mArr, 0, 0, 100)
          else if (stInd == 1) return this.u_done()
          else {
            let temp = this.edata
            temp.equipmentStatus = 0
            temp.equipScreen = this.showImgURL
            this.edata = { ...temp }
            let res = await apiChangeEquipment(this.edata)
            if (res.data.code == '0') {
              uni.navigateBack()
            } else {
              uni.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }

          }
          return 0
        },
        fail: async (res) => {

          this.count = this.count + 1
          this.flag = {
            ...this.flag,
            tips: '上传进度 ' +
              (this.floor(((this.count + 1) / 96) * 100, 2) > 100
                ? 100
                : this.floor(((this.count + 1) / 96) * 100, 2)) +
              '%'
          }

          if (next || this.count >= 97) {
            this.flag = {
              ...this.flag,
              loading: false
            }
            stInd = stInd + 1
          }

          if (stInd == 0) return this.u_data(mArr, 0, 0, 100)
          else if (stInd == 1) return this.u_done()
          else {
            let temp = this.edata
            temp.equipmentStatus = 0
            temp.equipScreen = this.showImgURL
            this.edata = { ...temp }
            let res = await apiChangeEquipment(this.edata)
            if (res.data.code == '0') {
              uni.navigateBack()
            } else {
              uni.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }

          }
          return 0
        }
      })
    },
    u_next() {

      pxInd = 0

      this.u_send('NEXT_', true)
    },
    u_done() {

      return this.u_send('SHOW_', true)
    },
    u_show(a, k1, k2) {

      var x = '' + (k1 + (k2 * pxInd) / a.length)
      if (x.length > 5) x = x.substring(0, 5)

      return this.u_send(rqMsg + this.wordToStr(rqMsg.length) + 'LOAD_', pxInd >= a.length)
    },
    u_data(a, c, k1, k2) {

      rqMsg = ''
      if (c == -1) {
        while (pxInd < a.length && rqMsg.length < 1000) {
          var v = 0
          for (var i = 0; i < 16; i += 2)
            if (pxInd < a.length) v |= a[pxInd++] << i
          rqMsg += this.wordToStr(v)
        }
      } else if (c == -2) {
        while (pxInd < a.length && rqMsg.length < 1000) {
          var v = 0
          for (var i = 0; i < 16; i += 4)
            if (pxInd < a.length) v |= a[pxInd++] << i
          rqMsg += this.wordToStr(v)
        }
      } else {
        while (pxInd < a.length && rqMsg.length < 1000) {
          var v = 0
          for (var i = 0; i < 8; i++)
            if (pxInd < a.length && a[pxInd++] != c) v |= 128 >> i
          rqMsg += this.byteToStr(v)
        }
      }
      return this.u_show(a, k1, k2)
    },
    u_line(a, k1, k2) {

      var x
      rqMsg = ''
      while (rqMsg.length < 1000) {
        x = 0
        while (x < 122) {
          var v = 0
          for (var i = 0; i < 8 && x < 122; i++, x++)
            if (a[pxInd++] != 0) v |= 128 >> i

          rqMsg += this.byteToStr(v)
        }
      }
      return this.u_show(a, k1, k2)
    },
  },

}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
