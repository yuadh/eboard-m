<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: async function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  @import "@/uni_modules/uview-ui/index.scss";
  @import 'common/css/common.scss';
	/*每个页面公共css */
</style>
