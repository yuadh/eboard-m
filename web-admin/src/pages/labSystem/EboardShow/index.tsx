
import React from "react";
import { Card, Col, Row,Button,Input,Radio,Upload,message,Spin,Progress } from "antd";
import {useRef} from 'react';
import styles from './index.less'
import { setVal,getNear,addVal, getVal } from "./aTools";
import {uploadImage} from './uploadTools'
import axios from "axios";
import Loading from "../widget/Loading";
import { PageContainer } from '@ant-design/pro-layout';
// axios.defaults.timeout = 1000;
let srcImg: any
let curPal: any
const inputRef: any = React.createRef();
const canvasRef: any = React.createRef();
const imgRef: any = React.createRef();
const goodRef: any = React.createRef();
let pxInd: number,stInd: number 
let nArr: any
let sendURL: string
let rqMsg: any
const palArr = [ //墨水屏颜色数组 0:黑白 1:黑白红
    [
      [0, 0, 0],
      [255, 255, 255],
    ],
    [
      [0, 0, 0],
      [255, 255, 255],
      [127, 0, 0],
    ],
  ]
  //0:黑白 1:红白黑  7:7彩色 3、5:多色组合
const epdArr = [ //墨水屏尺寸数组，第三个表示墨水屏支持显示的色位，默认0 
    [400, 300, 0], //13 - 4.2寸实验版
    [400, 300, 1], //14 - 多色版本
    [800, 480, 0], //22 - 7.5寸正式版
    [800, 480, 1], //23 - 多色版本
  ]
class CanvasShow extends React.Component<any,any>{
  state={
   ip:'192.168.43.149',
   loading: false,
   epdX:0,
   epdY:0,
   epdW:400,
   epdH:300,
   eValue:0,
   showSrc:'',
   mArr:'',
   percentNum:0
  }
  init = ()=>{
    this.setState({
      loading: false,
    })
  }
  onChange = (e: any)=>{
    this.setState({
      eValue:e.target.value,
      epdW:epdArr[e.target.value][0],
      epdH:epdArr[e.target.value][1]
    })
  }
  render(){
    const icon = <Progress type="circle" percent={this.state.percentNum} />
    return (
      <PageContainer>
        <div className="gutter-example" style={{width:'100%'}}>
        <Spin indicator={icon} spinning={this.state.loading}>
          <Row gutter={24} className={styles.root}>
            <Col xl={24}  className="gutter-row">
              <div className="gutter-box">
                <Card title="投送实验" bordered={false} >
                  <div className="show">
                    <div className="srcBox">
                      {this.state.showSrc===''?
                      (<div className="imgBox">
                        <div className="mesBox">
                          放置图片在此处...
                        </div>
                      </div>):(<img ref={goodRef} width="400" height="300" className="showImg" src={this.state.showSrc} alt="" />)
                      }
                    </div>
                    <div className="showBody">
                      <canvas id="source" width="400" height="300" ref={imgRef} className="tarnShow" />
                      <canvas id="canvas" width="400" height="300" ref={canvasRef} className="hideInput" />
                    </div>
                  </div>
                  <div className="appState">
                    <span>设备状态</span>
                    <div className="ip">
                      <Input addonBefore="ip地址" value={this.state.ip} />
                    </div>
                    <div className="location" >
                      <Input addonBefore="坐标X" defaultValue="0" value={this.state.epdX} />
                      <Input addonBefore="坐标Y" defaultValue="0" value={this.state.epdY} />
                    </div>
                    <div className="eSize" >
                      <Input addonBefore="宽度W" defaultValue="0" value={this.state.epdW} />
                      <Input addonBefore="高度H" defaultValue="0" value={this.state.epdH} />
                    </div>
                    <div className="vSwtich" >
                      <Radio.Group onChange={this.onChange} value={this.state.eValue}>
                        <Radio value={0}>4.2型号</Radio>
                        <Radio value={2}>7.5型号</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="btns">
                    <span>相关操作</span>
                    <Button block onClick={()=>{ inputRef.current.click();}}>
                      选择模板
                    </Button>
                    <input 
                      className="hideInput"
                      onChange={(e)=>{this.processFiles(e)}} 
                      ref={inputRef} 
                      type="file" 
                    />
                    <Button block onClick={()=>this.procImg(false,false)}>阶梯算法生成</Button>
                    <Button block onClick={()=>this.procImg(false,false)}>抖动算法生成</Button>
                    <Button block onClick={()=>this.uploadDate()}>投送设备</Button>
                  </div>

                </Card>
              </div>
            </Col>
          </Row>
        </Spin>
      </div>
      </PageContainer>
    )
  }
  //墨水屏图片生成处理函数
  procImg=(isLvl: boolean,isRed: boolean)=>{
    if(this.state.showSrc===''){
      message.warn('请选择模板')
      return 
    }
    if(isRed){
      message.warn('暂无多色墨水屏，尽情期待')
      return 
    }
    //默认为黑白
    curPal = palArr[0]
    if(this.state.epdW<4||this.state.epdH<4){
      message.warn('图片太小，请另选一张')
      return 
    }
    const canvas = canvasRef.current
    const source = imgRef.current
    canvas.width = this.state.epdW
    canvas.height = this.state.epdH
    source.getContext('2d').drawImage(srcImg, 0, 0, srcImg.width, srcImg.height)
    const fArr = canvas.getContext('2d').getImageData(0,0,this.state.epdW,this.state.epdH)
    const mArr = source.getContext('2d').getImageData(0,0,srcImg.width,srcImg.height)
    this.setState({
      mArr:fArr
    })
    console.log(srcImg)

    console.log(mArr) 

    let index = 0
    if(isLvl){//效果差

    }else {//抖动算法，效果好
      let aInd = 0
      let bInd = 1
      const errArr = new Array(2)
      errArr[0] = new Array(this.state.epdW)
      errArr[1] = new Array(this.state.epdW)
      for (let i=0;i<this.state.epdW;i++){
        errArr[bInd][i] = [0,0,0]
      }
      for(let j=0; j<this.state.epdH; j++){
        const y = this.state.epdY + j
        if(y<0||y>=srcImg.height){//如果超出待提取的图片，填充默认数据
          for(let i=0; i<this.state.epdW; i++,index+=4){
            setVal(curPal,fArr,index,(i+j)%2===0?1:0)
          }
          continue
        }
        aInd = ((bInd = aInd) + 1) & 1
        for(let i=0;i<this.state.epdW;i++){
          errArr[bInd][i] = [0, 0, 0]
        }
        for(let i=0;i<this.state.epdW;i++){
          const x = this.state.epdX+i
          if(x<0||x>=srcImg.width){//如果超出待提取的图片，填充默认数据
            setVal(curPal,fArr,index,(i+j)%2===0?1:0)
            index += 4
            continue
          }
          const pos = (y*srcImg.width+x)*4
          const old = errArr[aInd][i]
          let r = mArr.data[pos] + old[0]
          let g = mArr.data[pos+1] + old[1]
          let b = mArr.data[pos+2] + old[2]
          const colVal = curPal[getNear(curPal,r,g,b)]
          fArr.data[index++] = colVal[0]
          fArr.data[index++] = colVal[1]
          fArr.data[index++] = colVal[2]
          fArr.data[index++] = 255
          r = r - colVal[0]
          g = g - colVal[1]
          b = b - colVal[2]

          if (i == 0) {
            errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 7.0)
            errArr[bInd][i + 1] = addVal(errArr[bInd][i + 1], r, g, b, 2.0)
            errArr[aInd][i + 1] = addVal(errArr[aInd][i + 1], r, g, b, 7.0)
          } else if (i == this.state.epdW - 1) {
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
    }
    console.log(fArr)
    source.getContext('2d').putImageData(fArr, 0, 0)
  }
  processFiles=(e: any)=>{
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader()
    srcImg = new Image(400,300)
    reader.onload = (e: any)=>{
      this.state.showSrc = e.target.result
      srcImg.src = e.target.result
      this.init()
    }
    try{
      reader.readAsDataURL(file)
    }catch(e){
      message.warn('功能出错..实验中')
    }
  }
  uploadDate = ()=>{
    this.setState({
      loading:true
    })
    const c = canvasRef.current
    const dispW = srcImg.width
    const dispH = srcImg.height
    const pArr = this.state.mArr
    nArr = new Array(dispW*dispH)
    
    let index = 0
    for (let y = 0; y < dispH; y++){
      for (let x = 0; x < dispW; x++, index++) {
        nArr[index] = getVal(pArr, index << 2)
      }
    }
    console.log(pArr)
    console.log(nArr)
    pxInd = 0
    stInd = 0
    sendURL = 'http://' + this.state.ip + '/'
    // 暂时仅支持 4.2寸黑白和7.5寸黑白红
    this.u_send('EPD' + String.fromCharCode(13 + 97) + '_',false)
  }
  //字符转
  byteToStr=(v: any)=> {
    return String.fromCharCode((v & 0xf) + 97, ((v >> 4) & 0xf) + 97)
  }
  //看不懂
  wordToStr=(v: any)=> {
    return this.byteToStr(v & 0xff) + this.byteToStr((v >> 8) & 0xff)
  }
  u_next=()=> {
    console.log('u_next执行----步骤4')
    pxInd = 0
    this.u_send('NEXT_', true)
  }
  u_done=()=> {
    this.setState({
      percentNum:0,
      loading:false
    })
    console.log('u_done执行----步骤5')
    return this.u_send('SHOW_', true)
  }
  u_send=(cmd: any,next: any)=>{
    console.log('u_send执行----步骤1')
    axios.post(
      sendURL+cmd,
      ''
    ).then((res)=>{
      console.log(res)
      if (stInd === 0) return this.u_data(nArr,0,0,50)
      if (stInd === 1) return this.u_next()
      if (stInd === 2) return this.u_data(nArr, 3, 50, 50)
      if (stInd === 3) return this.u_done()
    }).catch((err)=>{
      console.log(err)
      if (stInd === 0) {
        console.log('-------执行!!!')
        return this.u_data(nArr,0,0,50)
      }
      if (stInd === 1) return this.u_next()
      if (stInd === 2) return this.u_data(nArr, 3, 50, 50)
      if (stInd === 3) return this.u_done()
    })
    if(next){
      stInd++
    }
    return 
  }

  u_show=(a: any, k1: number, k2: number)=> {
    console.log('u_show执行----步骤3')
    let x = '' + (k1 + (k2 * pxInd) / a.length)
    if (x.length > 5) x = x.substring(0, 5) //取5位进度数，包括小数点
    this.setState({
      percentNum: x
    })
    return this.u_send(rqMsg + this.wordToStr(rqMsg.length) + 'LOAD_', pxInd >= a.length)
  }

  u_data=(a: any, c: number, k1: number, k2: number) =>{
    console.log('u_data执行----步骤2')
    rqMsg = ''

    if (c == -1) {
      while (pxInd < a.length && rqMsg.length < 1000) {
        var v = 0
        for (var i = 0; i < 16; i += 2) if (pxInd < a.length) v |= a[pxInd++] << i
        rqMsg += this.wordToStr(v)
      }
    } else if (c == -2) {
      while (pxInd < a.length && rqMsg.length < 1000) {
        var v = 0
        for (var i = 0; i < 16; i += 4) if (pxInd < a.length) v |= a[pxInd++] << i
        rqMsg += this.wordToStr(v)
      }
    } else {
      //非特殊尺寸默认进入此代码块，分块传输每次大小不超过1000byte ~1byte=8bit
      while (pxInd < a.length && rqMsg.length < 1000) {
        var v = 0 //0000 0000
        for (var i = 0; i < 8; i++)
          // 像素代表色不等于0黑色时 需要把V转成 0x1111 1111
          if (pxInd < a.length && a[pxInd++] != c) v |= 128 >> i
        //将像素点转为 byte 为单位的字符串
        rqMsg += this.byteToStr(v)
        // console.log(v + '???????????')
      }
    }

    // console.log(rqMsg)
    return this.u_show(a, k1, k2)
  }
}

export default CanvasShow