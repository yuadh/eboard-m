<template>
	<view v-if="loadshow" class="fullloading" :style="{backgroundColor: bgcolor}">
		<image :src="loadicon" :style="{width:iconwidth+'rpx',height:iconheight+'rpx'}"></image>
		<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
	</view>
</template>
<script>
	export default {
		props: {
			loadicon: {
				type: String,
				default() {
					return ''
				}
			},
			text: {
				type: String,
				default() {
					return ''
				}
			},
			iconwidth: {
				type: [Number, String],
				default() {
					return 110
				}
			},
			iconheight: {
				type: [Number, String],
				default() {
					return 110
				}
			},
			textcolor: {
				type: String,
				default() {
					return '#000000'
				}
			},
			textsize: {
				type: [Number, String],
				default() {
					return 30
				}
			},
			bgcolor: {
				type: String,
				default() {
					return '#ffffff'
				}
			},
			loadshow: {
				type: Boolean,
				default() {
					return true
				}
			},
		},
		data() {
			return {
				loadingImg: '/static/loading.gif',
				errorImg: ''
			}
		},
		methods: {
		}
	}
</script>
<style scoped>
	.fullloading{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		text-align: center;
		z-index: 99999;
	}
	.fullloading image{
		width: 110rpx;
		height: 110rpx;
		margin-top: 50%;
	}
</style>