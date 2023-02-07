<template>
	<view class="content">
		<view class="bg"></view>
		<view class="bg2"></view>
		<view class="tips">
			<text class="title">EBoard-M</text>
			<text class="subtitle">会议室智能桌签系统~</text>
		</view>
		<view class="form-box">
			<view class="input-box">
				<uni-icons type="person" size="30" class="left" color="#b0b0b1"></uni-icons>
				<input v-model="loginRequest.userAccount" placeholder="请输入账号:root" />
			</view>
			<view class="input-box">
				<uni-icons type="locked-filled" size="30" class="left" color="#b0b0b1"></uni-icons>
				<input class="uni-input" password v-model="loginRequest.userPassword" type="text"
					placeholder="请输入密码:123456" />
			</view>
			<button type="primary" class="btn" @click="userLogin">登录</button>
		</view>
	</view>
</template>

<script>
import { apiUserLogin } from '@/apis/user.js'
import { setUserLoginState } from '@/utils/cookieUtils.js'
import { mapMutations } from 'vuex'
export default {
	data() {
		return {
			loginRequest: {
				userAccount: '',
				userPassword: ''
			}
		}
	},
	props: ['name', 'pass'],
	methods: {
		...mapMutations(['storeLogin']),
		async userLogin() {
			// let that = this;
			let userAccount = this.loginRequest.userAccount
			let userPassword = this.loginRequest.userPassword
			if (!userAccount || !userPassword) {
				uni.showToast({
					icon: 'none',
					title: '账号或密码不能为空',
					duration: 1000
				});
				return;
			}
			if (userAccount.length < 4) {
				uni.showToast({
					icon: 'none',
					title: '账号有误',
					duration: 1000
				});
				return;
			}
			if (userPassword.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码有误',
					duration: 1000
				});
				return;
			}
			try {
				// 发送登录请求
				let res = await apiUserLogin(this.loginRequest)

				if (res.cookies && res.cookies[0]) {//小程序端

					setUserLoginState(res.cookies[0])
					this.$store.commit('storeLogin', res.data.data)

				} else {//app端

					this.$store.commit('storeLogin', res.data.data)

				}
				uni.showToast({
					icon: 'success',
					title: '登录成功',
					duration: 1000
				})
				uni.navigateBack({
					delta: 1,
					fail: () => {
						uni.switchTab({
							url: '/pages/dashboard/index'
						})
					}
				})
			} catch (e) {

			}
		}
	}
}
</script>

<style lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;

	.tips {
		padding-top: 200rpx;
		padding-left: 80rpx;
		display: flex;
		flex-direction: column;

		.title {
			line-height: 70rpx;
			font-weight: bold;
			font-size: 50rpx;
		}

		.subtitle {
			line-height: 70rpx;
			font-size: 35rpx;
			font-weight: bold;
			color: #b0b0b1;
		}

	}

	.bg {
		position: fixed;
		top: -250rpx;
		right: -250rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #00baef;
		z-index: 2
	}

	.bg2 {
		position: fixed;
		top: -150rpx;
		right: -300rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #ade8f9;
		z-index: 1;
	}

	.form-box {
		padding-top: 180rpx;
		padding-left: 60rpx;
		width: 710rpx;

		.input-box {
			margin: 40rpx 0rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100rpx;
			background-color: #f5f5f5;
			border-radius: 100rpx;
			width: 100%;

			input {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
				margin-left: 0rpx;
			}

			.left {
				margin: 0 20rpx;
			}

			.right {
				padding: 0 30rpx;
				width: 40rpx;
				height: 40rpx;
				color: #b0b0b1;
			}
		}

		.btn {
			display: flex;
			justify-content: center;
			// margin-top: 20rpx;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-radius: 100rpx;
			color: #FFFFFF;
			background: linear-gradient(to right, #00c6fc, #9adcf1);
		}

		.other {
			display: flex;
			justify-content: space-between;

			text {
				line-height: 80rpx;
				font-size: 28rpx;
			}
		}
	}
}
</style>
