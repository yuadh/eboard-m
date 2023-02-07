<template>
 <view >
   <!-- 轮播图 -->
   <view class="swiper">
   	<view class="swiper-box">
      <uni-swiper-dot 
      :info="swiperList" 
      :current="currentSwiper" 
      mode="default"
      field="content" >
        <swiper 
        circular="true" 
        autoplay="true" 
        class="swiper-box"  
        @change="swiperChange">
          <swiper-item  
            v-for="(swiper,index) in swiperList" 
            :current="currentSwiper"  
            :key="index" 
            @change="swiperChange">
            <image class="swiper-item" :src="swiper.img" @tap="toSwiper(swiper)"></image>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
   	</view>
   </view>
   <!-- 操作按钮 -->
   <view class="promotion">
    <view class="text">系统操作</view>
   	<view class="list">
   		<view class="column select1" @click="open">
   			<view class="top">
   				<view class="title"><text class="tip">添加</text>会议室</view>
   			</view>
        <view class="left">
        	<view class="into">点击添加</view>
        </view>
   			<view class="right"><image src="https://img.yuadh.com/imgs/2023/02/05/into.png"></image></view>
   		</view>
      <view class="twoBox">
        <view class="column select2" >
        	<view class="top">
        		<view class="title" @click="gotoShow()"><text class="tip">点对点</text>投送</view>
        	</view>
          <view class="left">
          </view>
        	<view class="right"><image src="https://img.yuadh.com/imgs/2023/02/05/into2.png"></image></view>
        </view>
        <view class="column select3" >
        	<view class="top">
        		<view class="title" @click="gotoShow()"><text class="tip">点对多</text>投送</view>
        	</view>
          <view class="left">
  
          </view>
        	<view class="right"><image src="https://img.yuadh.com/imgs/2023/02/05/into3.png"></image></view>
        </view>
      </view>
   	</view>
   </view>
   <uni-popup ref="popup" type="center" class="addPopup" >
     <addRoom @popclose="popclose"></addRoom>
   </uni-popup>
   <view class="promotion place">
     <view class="text">近期会议</view>
     <view class="list">
       <view>
         <image src="https://img.yuadh.com/imgs/2023/02/05/none.png"></image>
       </view>
       <view class="conferenceTip">当前暂无会议</view>
     </view>
   </view>
 </view>
</template>

<script>
var ttt = 0;
  import {apiUserCurrent} from '@/apis/user.js'
  import addRoom from '../../components/addRoom/index.vue'
export default {
  components:{
    addRoom
  },
	data() {
		return {
			showHeader:true,
			afterHeaderOpacity: 1,//不透明度
			headerPosition: 'fixed',
			headerTop:null,
			statusTop:null,
			nVueTitle:null,
			city: '北京',
			currentSwiper: 0,
			// 轮播图片
			swiperList: [
				{ id: 1, src: 'EBoardM系统开发完善中', img: 'https://img.yuadh.com/imgs/2023/02/05/main3.png' },
				{ id: 2, src: 'EBoardM系统开发完善中', img: 'https://img.yuadh.com/imgs/2023/02/05/main1.png' },
        { id: 2, src: 'EBoardM系统开发完善中', img: 'https://img.yuadh.com/imgs/2023/02/05/main2.png' },
			],
			Promotion: [
        {title:'添加会议室',ad:'输入账号密码加入会议室',img:'https://img.yuadh.com/imgs/2023/02/05/into.png'},
        {title:'单点投屏',ad:'输入账号密码加入会议室',img:'https://img.yuadh.com/imgs/2023/02/05/into2.png'},
        // {title:'多点投屏',ad:'输入账号密码加入会议室',img:'/static/dashboard/list2.png'}
      ],
      loadingText: '正在加载...',
    }
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	async onLoad() {
	},
  onShow() {
    
  },
	methods: {
    popclose(){
      this.$refs.popup.close()
    },
    open(){
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    gotoShow(){
      uni.navigateTo({
        url:'/pages/room/index'
      })
    },
		//轮播图跳转
		toSwiper(e) {
			uni.showToast({ title: e.src, icon: 'none' });
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
	}
};
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
  box-sizing:border-box;
	font-size: 30upx;
}
.addPopup{
  border-radius: 30upx;
}
.swiper {
  background-color: #fff;
	width: 100%;
	// display: flex;
	// justify-content: center;
  margin-bottom: 0;
	.swiper-box {
		width: 100%;
		height:50vw;
		overflow: hidden;
		border-radius: 0upx;
		swiper {
			swiper-item {
				image {
					width: 100%;
					height: 100%;
          /* #ifndef APP-NVUE */
          display: flex;
          /* #endif */
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
				}
			}
		}
	}
}

.promotion {
  box-sizing: border-box;
	width: 100%;
  margin-top:-20upx;
  padding:0 4%;
  padding-bottom: 40upx;
  background-color: #fff;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 700;
		margin-top: 30upx;
    margin-left: 24upx;
    padding: 10upx 
	}
	.list {
		width: 100%;
		display: flex;
    margin-top: 10upx;
    margin-left: -10upx;
		.column {
      margin-left: 20upx;
			width: 340upx;
      height: 260upx;
			padding: 15upx 3%;
			background-color: rgba(0, 170, 255, 0.1);
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
      position: relative;
      box-shadow: 0upx 5upx 2upx rgba(0,0,0,0.3);
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
          margin-top: 20upx;
					font-size: 40upx;
          .tip{
            color:#00aaff;
          }
				}
			}
			.left {
				width: 50%;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.into {
					width: 100%;
					font-size: 26upx;
					color: #aaa;
					margin-bottom: 105upx;
				}
			}
			.right {
        position: absolute;
        right: -40upx;
        bottom: -88upx;
        z-index: 0;
				image {
					width: 40vw;
					height: 40vw;
          opacity: 0.8;
				}
			}
		}
	}
  .twoBox{
    .column{
      height: 120upx;
      
    }
    .select2{
      background-color: rgba(240, 240, 240, 1.0);
      .top{
        .title{
          margin-top: 50upx;
        }
      }
      .right{
        right: -10upx;
        bottom: -48upx;
        image{
          width: 20vw;
          height: 20vw;
          opacity: 0.8;
        }
      }
    }
    .select3{
      background-color: rgba(235, 249, 249, 0.6);
      margin-top: 20upx;
      .top{
        .title{
          margin-top: 50upx;
        }
      }
      .right{
        right: -10upx;
        bottom: -48upx;
        image{
          width: 20vw;
          height: 20vw;
          opacity: 0.8;
        }
      }
    }
  }
  
}
.place{
  margin-top: -20upx;
  .list{
    margin-top: 0;
    image{
      width: 400upx;
      height: 300upx;
    }
   display: flex;
   flex-flow: column;
   justify-content: center; 
   align-items: center;
   .conferenceTip{
     margin-top: -20upx;
   }
  }
  
}
</style>
