<template>
	<view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
        <view 
        class="row" 
        v-for="(category,index) in categoryList" 
        :key="category.id" 
        :class="[index==showCategoryIndex?'on':'']" 
        @tap="showCategory(index)">
          <view class="text">
            <view class="block"></view>
            {{category.title}}
          </view>
        </view>			
      </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			  <view 
         class="category" 
         v-for="(category,index) in categoryList" 
         :key="category.id" 
         v-show="index==showCategoryIndex" >
          <view class="banner">
            <image :src="category.banner"></image>
          </view>
          <view class="list">
            <!-- <view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
              <image :src="'/static/img/category/list/'+box.img"></image>
              <view class="text">{{box.name}}</view>
            </view> -->
            <view class="templateShow" v-for="(box,i) in category.list" :key="i" @click="toCategory">
              <image :src="'https://img.yuadh.com/imgs/2023/02/01/list'+box.img"></image>
              <view class="text">{{box.name}}</view>
            </view>
          </view>
				</view>
			</scroll-view>
    </view>
  </view>
</template>
<script>
	//高德SDK
	// import amap from '@/common/SDK/amap-wx.js';
	export default {
		data() {
			return {
				showCategoryIndex:0,
				headerPosition:"fixed",
				//分类列表
				categoryList:[
					{id:1,title:'推荐',banner:'https://img.yuadh.com/imgs/2023/02/05/show3.png',list:[
						{name:'会议模板001/（400*300）',	img:'1.png'},
						{name:'会议模板002/（400*300）',	img:'2.png'},
						{name:'会议模板003/（400*300）',	img:'3.png'},
					]},
					{id:2,title:'企业',banner:'https://img.yuadh.com/imgs/2023/02/05/show3.png',list:[
            {name:'会议模板001/（400*300）',	img:'1.png'},
            {name:'会议模板002/（400*300）',	img:'2.png'},
					]},
					{id:3,title:'校园',banner:'https://img.yuadh.com/imgs/2023/02/05/show3.png',list:[ 
            {name:'会议模板003/（400*300）',	img:'3.png'},
					]},
					{id:4,title:'通用',banner:'https://img.yuadh.com/imgs/2023/02/05/show3.png',list:[
            {name:'会议模板001/（400*300）',	img:'1.png'},
            {name:'会议模板002/（400*300）',	img:'2.png'},
            {name:'会议模板003/（400*300）',	img:'3.png'},
					]},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
      //模板点击
			toCategory(e){
				uni.navigateTo({
          url:'/pages/show/index'
				});
			},
		}
	}
</script>
<style lang="scss">

	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,.right{
			position: absolute;
			
			top: 4upx;
			// /*  #ifdef  APP-PLUS  */
			// top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}
		.left{
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					.block{
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					.text{
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block{
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #00baef;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
				width: 96%;
				padding: 20upx 3%;
				.banner{
          margin-left: 20upx;
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 24.262vw;
					}
				}
				.list{
					margin-top: 00upx;
					width: 105%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image{
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}
						.text{
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
          .templateShow{
              width: 100%;
              height: 48vw;
              background-color: #fff;
              border-radius: 10upx;
              overflow: hidden;
              margin-left: 10upx;
              margin-top: 20upx;
              box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
            	image{
            		width: 100%;
            		height: 40vw;
            	}
              .text{
                display: flex;
                justify-content: center;
              }
          }
				}
			}
		}
	}

</style>
