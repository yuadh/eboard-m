<template>
  <view class="bg">
    <view class="eTop">
      <view class="conferenceName">当前会议:{{ nowRoomDataVO.roomName ? nowRoomDataVO.roomName : '暂无会议' }}</view>
      <view class="canUseEquipNums">可用资源数: {{ nowRoomDataVO.inRoomEquipmenCount }}/{{ nowRoomDataVO.equipmentCount }}</view>
      <view class="topButs">
        <view class="btn1" v-if="!nowRoomDataVO.flag" @click="start">开始会议</view>
        <view class="btn1 btn2" v-else @click="finish">结束会议</view>
        <view class="btn1 btn3" v-if="nowRoomDataVO.flag">批量刷新</view>
      </view>
    </view>
    <view style="height:400rpx"></view>
    <view class="eBottom">
      <view class="list">
        <view class="card" v-for="(item, index) in dataList" :key="index">
          <view class="cLeft">
            <view class="equipName">{{ item.equipmentCode }}</view>
            <view class="equipState" :style="{ color: item.equipmentStatus == 0 ? 'green' : 'red' }">
              <view class="state" :style="{ backgroundColor: item.equipmentStatus == 0 ? 'green' : 'red' }"></view>
              {{ item.equipmentIp ? item.equipmentIp : '暂无数据' }}
            </view>
            <view class="eButs">
              <view class="btn1" @click="goto(item.equipmentIp, item.id)">修改</view>
              <view class="btn1 btn3" @click="equipmentTest(item.equipmentIp, item.id)">
                测试
              </view>
            </view>
          </view>
          <view class="cRight">
            <image :src="item.equipmentScreen !== null ? item.equipmentScreen : '/static/null.png'" mode="widthFix" />
          </view>
        </view>
      </view>
      <view class="more">暂无更无</view>
    </view>
  </view>
</template>

<script>
import { apiIntoRoom, apiGetRoomNow, apiStartConference, apiFinishConference, apiGetEquipment } from '../../apis/room.js'
export default {
  data() {
    return {
      uid: '',
      id: '',
      roomName: '',
      nowRoomDataVO: {},
      conferenceName: '',
      dataList: []
    }
  },
  onLoad(options) {
    this.id = options.roomId
    this.uid = options.userId
  },
  onShow() {
    this.conferenceInit()
  },
  methods: {
    async conferenceInit() {
      try {
        let res1 = await apiIntoRoom({ roomId: this.id })
        if (res1.data.code == '0') {
          this.dataList = res1.data.data
        } else {
          uni.showToast({
            title: res1.data.message,
            duration: 2000,
            icon: 'none'
          });
        }
      } catch (e) {
        console.log(e)
      }

      try {
        let res2 = await apiGetRoomNow({ id: this.id })
        if (res2.data.code == '0') {
          this.nowRoomDataVO = res2.data.data
          this.conferenceName = res2.data.data.roomName
        } else {
          uni.showToast({
            title: res2.data.message,
            duration: 2000,
            icon: 'none'
          });
        }
      } catch (e) {
        console.log(e)
      }
    },
    start() {
      uni.showModal({
        title: '开始会议',
        editable: true,
        success: async res => {
          if (res.confirm) {

            let startReq = {//数据结构设计有问题...
              roomId: this.id,
              userId: this.uid,
              createTime: "",
              finishTime: "",
              id: 0,
              isFinish: 0,
              conferenceName: res.content
            }
            try {
              let res = await apiStartConference(startReq)
              if (res.data.code == '0') {
                uni.showToast({
                  title: '开启会议',
                  duration: 1000,
                  icon: 'none'
                });
                this.conferenceInit()
              } else {
                uni.showToast({
                  title: res.data.message,
                  duration: 1000,
                  icon: 'none'
                });
              }
            } catch (e) {

            }
          }
        }
      })
    },
    finish() {
      uni.showModal({
        title: '结束会议？',
        success: async res => {
          if (res.confirm) {
            try {
              let res = await apiFinishConference(this.nowRoomDataVO.id)

              if (res.data.code == '0') {
                uni.showToast({
                  title: '结束成功～',
                  duration: 1000,
                  icon: 'none'
                });
                this.conferenceInit()
              } else {
                uni.showToast({
                  title: res.data.message,
                  duration: 2000,
                  icon: 'none'
                });
              }
            } catch (e) {

            }
          }
        }
      })
    },
    async equipmentTest(ip, id) {
      if (!ip) {
        uni.showToast({
          title: '暂无IP信息,等待连接！',
          duration: 2000,
          icon: 'none'
        });
        this.conferenceInit()
        return
      }
      try {
        let res = await apiGetEquipment(id)

        if (res.data.data.equipmentStatus == 1) {
          uni.showToast({
            title: '设备繁忙',
            duration: 2000,
            icon: 'none'
          });
          this.conferenceInit()
          return
        } else {
          uni.request({
            url: 'http://' + ip + '/test',
            method: 'GET',
            sslVerify: false,
            success(res) {

              if (res.errMsg === "request:ok") {
                uni.showToast({
                  title: '连接正常', //提示文字
                  duration: 2000, //显示时长
                  icon: 'none'
                })
                return
              } else {
                uni.showToast({
                  title: '连接异常', //提示文字
                  duration: 2000, //显示时长
                  icon: 'none'
                })
                return
              }
            },
            fail: (res) => {

              uni.showToast({
                title: '连接异常！',
                duration: 2000,
                icon: 'none'
              });
              return
            },
          })
        }
      } catch (e) {

      }
    },
    async goto(ip, id) {
      //未开始会议，不允许对设备进行修改
      if (!this.nowRoomDataVO.flag) {
        uni.showToast({
          title: '请先开始会议', //提示文字
          duration: 2000, //显示时长
          icon: 'none'
        })
        return
      }
      //如果设备未获取到IP信息
      if (!ip) {
        wx.showToast({
          title: '暂无IP信息,等待连接！', //提示文字
          duration: 2000, //显示时长
          icon: 'none'
        })
        return
      }
      let res = await apiGetEquipment(id)

      if (res.data.data.equipmentStatus == 1) {
        uni.showToast({
          title: '设备繁忙',
          duration: 2000,
          icon: 'none'
        });
        this.conferenceInit()
        return
      } else {
        uni.navigateTo({
          url: '/pages/show/index?id=' + id
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* pages/equip/equip.wxss */
page {
  height: 100%;
  width: 100%;
  background-color: #eee;
}

.eTop {
  z-index: 999;
  background-color: #fff;
  height: 400rpx;
  width: 100%;
  position: fixed;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.conferenceName {
  font-size: 54rpx;
}

.canUseEquipNums {
  font-size: 44rpx;
}

.topButs {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

.btn1 {
  padding: 5px 15px;
  border-radius: 20rpx;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10rpx 10rpx 0 0;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: #fff;
  color: #0e9f65;
  border: 2px solid #05791e;
  margin-left: 0rpx;
}

.btn1:active {
  background-color: #10a280;
  color: #fff;
}

.btn2 {
  color: #eb2546;
  border: 2px solid #bb0808;
}

.btn2:active {
  background-color: #c10812;
  color: #fff;
}

.btn3 {
  color: #1b60c2;
  border: 2px solid #0814eb;
}

.btn3:active {
  background-color: #080f64;
  color: #fff;
}

.eBottom .list {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: start;
  align-items: center;

}


.card {
  box-sizing: border-box;
  width: 90%;
  height: 300rpx;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 40rpx;
  display: flex;
  flex-flow: row;
  margin-top: 50rpx;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.cLeft {
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: start;
}

.equipName {
  font-size: 54rpx;
  margin-left: 10rpx;
}

.equipState {
  font-size: 34rpx;
  display: flex;
  align-items: center;
  margin-left: 10rpx;
}

.equipState .state {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  border: 1rpx black solid;
  margin-right: 10rpx;
}

.cRight {
  width: 50%;
  height: 100%;
  padding: 1rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.more {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
}

.addForm {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 0rpx;
}

.formList {
  width: 100%;
  height: 50%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.AddTitle {
  text-align: center;
  font-size: 17px;
  color: #000;
  text-decoration: none;
  margin-left: 20rpx;
  width: 40%;
}

.weui-input {

  font-size: 18px;
  width: 60%;
  text-align: start;
  padding-left: 30rpx;
}
</style>