<!-- 课程班级 -->
<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box" v-if="dataList.length">
							<view class="order" v-for="(res, index) in dataList" :key="index">
								<view class="top">
									<view class="left">
										<uni-text class="cuIcon-titles text-blue"></uni-text>
										<view class="store">会议室：{{ res.roomName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">
										<text class="text-blue">会议室容量：</text>
										<view class="progressBox">
											<u-line-progress :percent="res.equipmentCount" :active-color="activeColor"
												:striped="true" :stripedActive="true"></u-line-progress>
										</view>
									</view>
								</view>
								<view class="item">
									<view class="left">
										<image src="/static/room/web1.jpg" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2 text-bold">当前会议：{{ res.roomName }}</view>
										<view class="type">会议室简介：{{ res.roomMsg }}</view>
										<view class="delivery-time">管理员： {{ res.roomName }}</view>
									</view>
								</view>
								<view class="bottom">
									<view>
										<view class="cu-avatar-group" style="padding-left: 24rpx;">
											<view class="cu-avatar round" v-for="(item, index) in avatar" :key="index"
												:style="[{ backgroundImage: 'url(' + avatar[index] + ')' }]"></view>
										</view>
										<text class="text-blue text-shadow onLineCount">在线人数:12人</text>
									</view>

									<view class="btnBox">
										<view @click="goClass(res, userInfo.id)" class="evaluate btn btn1">进入</view>
										<!-- <view class="exchange btn">分享课程</view> -->
										<view @click="goRemove(res.id)" class="evaluate btn btn2">移除</view>
									</view>
								</view>
								<u-line color="#f1f1f1" margin="24rpx 0 15rpx 0"></u-line>
							</view>
						</view>
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无会议室信息
										<view class="tips">可以点击下方按钮添加会议室</view>
									</view>
									<view class="btn" @click="open">添加会议室</view>
								</view>
							</view>
						</view>
						<view class="explain secExplain" v-if="dataList.length">
							<view class="tips">暂无会议室信息</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="http://cdn.zhoukaiwen.com/noData1.png" mode="widthFix"></image>
									<view class="explain">
										暂无会议室信息
										<view class="tips">可以点击下方按钮添加会议室</view>
									</view>
									<view class="btn" @click="open">添加会议室</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<uni-popup ref="popup" type="center" class="addPopup">
			<addRoom @popclose="popclose"></addRoom>
		</uni-popup>
	</view>
</template>

<script>
import { apiUserRooms, apiRemoveRoom } from '../../apis/room.js'
import { getCurrentUser } from '../../utils/vuexUtils.js'
import addRoom from '../../components/addRoom/index.vue'
export default {
	components: {
		addRoom
	},
	onShow() {
		this.roomInt()
	},
	data() {
		return {
			userInfo: '',
			percent: 50,
			activeColor: '#0081ff',
			striped: false,
			stripedActive: false,
			avatar: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
			],
			dataList: [
			],
			list: [
				{
					name: '已加入会议室'
				},
				{
					name: '已退出会议室'
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
		};
	},
	onLoad() {
	},
	computed: {

	},
	methods: {
		popclose() {
			this.$refs.popup.close()
			this.roomInt()
		},
		open() {
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			this.$refs.popup.open('center')
		},
		async roomInt() {
			await getCurrentUser()
			let userInfo = this.$store.state.userInfo
			this.userInfo = userInfo
			this.getRooms(this.$store.state.userInfo.id)
		},

		async getRooms(uid) {
			try {
				let res = await apiUserRooms(uid);
				this.dataList = [...res.data.data]

			} catch (e) {

			}
		},
		goClass(res, uid) {
			if (res.roomStatus == 1) {
				uni.showToast({
					title: '会议室当前不可用',
					duration: 2000,
					icon: 'none'
				});
			}
			uni.navigateTo({
				url: '/pages/conference/index?roomId=' + res.id + '&userId=' + uid
			})
		},
		async goRemove(eid) {
			try {
				let req = {
					roomId: eid,
					userId: this.userInfo.id
				}


				let res = await apiRemoveRoom(req)

				if (res.data.code == '0') {
					this.roomInt()
					uni.showToast({
						title: '移除成功',
						icon: 'none',
						duration: 1000
					})
				}
			} catch (e) {

			}
		},
		// 页面数据
		getOrderList(idx) {

		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>


<style lang="scss" scoped>
/* #ifndef H5 */
  page {
  	height: 100%;
  	background-color: #f2f2f2;
  }

  /* #endif */
  .text-blue {
  	color: #243949;
  }

  .order {
  	width: 710rpx;
  	background-color: #ffffff;
  	margin: 20rpx auto;
  	border-radius: 20rpx;
  	box-sizing: border-box;
  	padding: 20rpx;
  	font-size: 28rpx;

  	.top {
  		display: flex;
  		justify-content: space-between;

  		.left {
  			display: flex;
  			align-items: center;

  			.store {
  				margin: 0 10rpx;
  				font-size: 34rpx;
  				font-weight: bold;
  			}
  		}

  		.right {
  			margin-top: 8rpx;
  			color: #1cbbb4;

  			.progressBox {
  				width: 150rpx;
  				float: right;
  			}
  		}
  	}

  	.item {
  		display: flex;
  		margin: 20rpx 0 0;

  		.left {
  			margin-right: 20rpx;

  			image {
  				width: 260rpx;
  				height: 190rpx;
  				border-radius: 10rpx;
  			}
  		}

  		.content {
  			.title {
  				font-size: 28rpx;
  				line-height: 45rpx;
  			}

  			.type {
  				margin: 6rpx 0;
  				font-size: 24rpx;
  				color: #304352;
  				text-overflow: -o-ellipsis-lastline;
  				overflow: hidden;
  				text-overflow: ellipsis;
  				display: -webkit-box;
  				-webkit-line-clamp: 3;
  				line-clamp: 3;
  				-webkit-box-orient: vertical;
  			}

  			.delivery-time {
  				color: #0081ff;
  				font-size: 24rpx;
  			}
  		}

  		.right {
  			margin-left: 10rpx;
  			padding-top: 20rpx;
  			text-align: right;

  			.decimal {
  				font-size: 24rpx;
  				margin-top: 4rpx;
  			}

  			.number {
  				color: #1cbbb4;
  				font-size: 24rpx;
  			}
  		}
  	}

  	.total {
  		margin-top: 20rpx;
  		text-align: right;
  		font-size: 24rpx;

  		.total-price {
  			font-size: 32rpx;
  		}
  	}

  	.bottom {
  		line-height: 70rpx;
  		display: flex;
  		justify-content: space-between;
  		align-items: center;

  		.btnBox {
  			width: 320rpx;
  			display: flex;
  			justify-content: space-between;

  			.btn {
  				line-height: 52rpx;
  				width: 140rpx;
  				border-radius: 12rpx;
  				border: 4rpx solid #1cbbb4;
  				padding: 10rpx 20rpx;
  				font-size: 36rpx;
  				text-align: center;
  				color: #1cbbb4;
  			}

  			.btn:active {
  				color: #fff;
  				background-color: #1cbbb4;
  			}

  			.evaluate {
  				color: #1cbbb4;
  				border-color: #1cbbb4;
  			}

  			.btn2 {
  				color: #304352;
  				border-color: #304352;
  				margin-right: 20rpx;
  			}

  			.btn2:active {
  				color: #fff;
  				background-color: #304352;
  			}
  		}
  	}
  }

  .onLineCount {
  	align-items: center;
  }

  .centre {
  	text-align: center;
  	margin: 200rpx auto;
  	font-size: 32rpx;

  	image {
  		width: 300rpx;
  		border-radius: 50%;
  		margin: 0 auto;
  	}

  	.tips {
  		font-size: 24rpx;
  		color: #999999;
  		margin-top: 20rpx;
  	}

  	.btn {
  		margin: 80rpx auto;
  		width: 200rpx;
  		border-radius: 32rpx;
  		line-height: 64rpx;
  		color: #ffffff;
  		font-size: 26rpx;
  		background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
  	}
  }

  .wrap {
  	display: flex;
  	flex-direction: column;
  	height: calc(100vh - var(--window-top));
  	width: 100%;
  }

  .swiper-box {
  	flex: 1;
  }

  .swiper-item {
  	height: 100%;

  	.secExplain {
  		margin-top: -40rpx;
  		margin-bottom: 10rpx;
  		display: flex;
  		justify-content: center;
  	}
  }
</style>

