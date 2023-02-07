<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<image class="avatar" :src="user.userAvater">
						</view>
						<view class="phone-number">{{ user.userName }}</view>
						<view class="box-bd">
							<view class="item">
								<view class="icon">
									<image src="../../static/user/message.png">
								</view>
								<view class="text">系统通知</view>
							</view>
							<view class="item">
								<view class="icon">
									<image src="../../static/user/favorite.png">
								</view>
								<view class="text">我的收藏</view>
							</view>
							<view class="item">
								<view class="icon">
									<image src="../../static/user/service.png">
								</view>
								<view class="text">系统客服</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="top"></view>
		<view class="list-content">
			<view class="list">

			</view>
			<view class="list">

				<view class="li ">
					<view class="icon">
						<image src="../../static/user/help.png"></image>
					</view>
					<view class="text">会议记录</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li">
					<view class="icon">
						<image src="../../static/user/set.png"></image>
					</view>
					<view class="text">系统设置</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li ">
					<view class="icon">
						<image src="../../static/user/about.png"></image>
					</view>
					<view class="text">软件说明</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li ">
					<view class="icon">
						<image src="../../static/user/opinion.png"></image>
					</view>
					<view class="text">建议反馈</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">

				<view class="li " @click="userLogout">
					<view class="icon">
						<image src="../../static/user/logout.png"></image>
					</view>
					<view class="text">退出登录</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { apiUserCurrent, apiUserLogout } from '@/apis/user.js'
import { clearUserLoginState } from '@/utils/cookieUtils.js'
export default {
	data() {
		return {
			user: {}
		};
	},
	async onShow() {
		try {
			let res = await apiUserCurrent();

			if (res.data.code == '0') {
				this.user = res.data.data;
				this.$store.commit('storeLogin', res.data.data)
			}


		} catch (e) {

		}
	},
	methods: {
		changeSkin() {

		},
		userLogout() {
			uni.showModal({
				title: '提示',
				content: '退出登录？',
				success: async res => {
					if (res.confirm) {
						let res = await apiUserLogout()

						try {
							if (res.data.code == '0') {
								clearUserLoginState()
								uni.showToast({
									icon: 'none',
									title: '退出登录'
								})
								uni.navigateTo({
									url: '/pages/login/index'
								})
							}
						} catch (e) {

						}
					} else if (res.cancel) {

					}
				}
			});

		}
	}
}
</script>

<style lang="scss">
page {
	background-color: #f1f1f1;
	font-size: 30upx;
}

.top {
	height: 140rpx;
}

.header {
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;

	.bg {
		width: 100%;
		height: 400upx;
		padding-top: 100upx;
		background-color: #4191ea;
	}
}

.box {
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

	.box-hd {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;

		.avator {
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;

			image {
				background-size: cover;
				width: 100%;
				height: 100%;
			}

			avatar {
				width: 60upx;
				height: 60upx;
			}
		}

		.phone-number {
			width: 100%;
			text-align: center;
		}
	}

	.box-bd {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;

		.item {
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 15upx;

			&:last-child {
				border: none;
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}

.list-content {
	background: #fff;
}

.list {
	width: 100%;
	border-bottom: 15upx solid #f1f1f1;
	background: #fff;

	&:last-child {
		border: none;
	}

	.li:active {
		background-color: #eee;
	}

	.li {
		width: 100%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: 1px solid rgb(243, 243, 243);
		display: flex;
		align-items: center;

		&.noborder {
			border-bottom: 0
		}

		.icon {
			flex-shrink: 0;
			width: 50upx;
			height: 50upx;

			image {
				width: 50upx;
				height: 50upx;
			}
		}

		.text {
			padding-left: 20upx;
			width: 100%;
			color: #666;
		}

		.to {
			padding-left: 20upx;
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
