<template>
  <view class="container">
    <uni-section title="表单校验" type="line">
      <view class="example">
        <!-- 基础表单校验 -->
        <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
          <uni-forms-item label="账号:" required name="roomName">
            <uni-easyinput
              v-model="valiFormData.roomName"
              placeholder="请输入会议室账号"
            />
          </uni-forms-item>
          <uni-forms-item label="密码:" required name="roomPassword">
            <uni-easyinput
              v-model="valiFormData.roomPassword"
              placeholder="请输入会议室密码"
            />
          </uni-forms-item>
        </uni-forms>
        <button @click="submit('valiForm')" class="btn">提交</button>
      </view>
    </uni-section>
  </view>
</template>

<script>
import { apiAddRoom } from "../../apis/room"

export default {
  data() {
    return {
      addRequest: {
        userId: "",
        roomName: "",
        roomPassword: "",
      },
      // 校验表单数据
      valiFormData: {
        roomName: "",
        roomPassword: "",
      },
      // 校验规则
      rules: {
        roomName: {
          rules: [
            {
              required: true,
              errorMessage: "会议名称不能为空",
            },
            {
              minLenth: 4,
              errorMessage: "会议名称有误",
            },
          ],
        },
        roomPassword: {
          rules: [
            {
              required: true,
              errorMessage: "会议密码不能为空",
            },
            {
              minLenth: 6,
              errorMessage: "密码有误",
            },
          ],
        },
      },
    }
  },
  methods: {
    Init() {
      let userInfo = this.$store.state.userInfo
      // if (userInfo == null) {
      // 	uni.navigateTo({
      // 		url: '/pages/login/index'
      // 	})
      // }
      this.addRequest.userId = userInfo.id
    },
    submit(ref) {
      this.Init()
      this.$refs[ref]
        .validate()
        .then(async (res) => {
          try {
            let req = this.addRequest
            req.roomName = this.valiFormData.roomName
            req.roomPassword = this.valiFormData.roomPassword
            let res = await apiAddRoom(req)
            if (res.data.code == "0") {
              uni.showToast({
                title: "添加成功",
                duration: 1000,
                icon: "none",
              })
              this.$emit("popclose")
            } else {
              uni.showToast({
                title: "！添加失败",
                duration: 1000,
                icon: "none",
              })
              this.$emit("popclose")
            }
          } catch (e) {
            console.log(e)
          }
        })
        .catch((err) => {
          console.log("err", err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  border-radius: 15upx;
}

.btn {
  background-color: #00baef;
  color: #fff;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
</style>
