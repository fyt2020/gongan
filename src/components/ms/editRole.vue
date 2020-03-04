<template>
  <div class="im-box">
    <el-dialog title="编辑角色" :visible.sync="con.key" width="30%" center :before-close="handleClose" :close-on-click-modal="false" class="editRole">
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">角色名称</span>
              <input type="text" id="one" class="inp" v-model="taskData.rolename" />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one1">
              <span class="f-w">角色描述</span>
              <textarea name id="one1" rows="3" v-model="taskData.description"></textarea>
            </label>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="dialogBtn">放弃</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
export default {
  props: ["con"],
  data() {
    return {
      taskData: {
        rolename: "",
        description: "",
        type: 1
      }
    };
  },
  computed: {},
  created() {
  
   
  },

  methods: {

      getRole(data){
      this.$http.api
        .get(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles?sysrole=${data}`)
        .then(function(res) {
            console.log(res)
          if (res.data.code === 0) {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },

    save() {
      let VM = this;
      let id = this.$parent.dialogKey1.id;
      console.log(id)
      if (!this.taskData.rolename || !this.taskData.description) {
          this.$message({
          message: '编辑内容不能为空',
          type: 'warning',
          customClass:'zZindex'
        }); 
        
        return;
      }
      let params = this.taskData;
      this.$http.api
        .put(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles/${id}`, params)
        .then(function(res) {
            console.log(res)
          if (res.data.code === 0) {
            VM.taskData = {
              rolename: "",
              description: "",
              type: 1
            };
            VM.$parent.getRoleArr();
            VM.$Message.success(`编辑成功`);
              VM.$parent.dialogKey1.key = false;
          } else {
            VM.$Message.error(`编辑失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClose() {
     this.$parent.dialogKey1.key = false;
    },
    giveUp() {
      this.$parent.dialogKey1.key = false;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 90%;
    // height: 130px;

    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;

      .inp-con {
        display: flex;
        align-items: center;
        margin-right: 36px;
        .f-w {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 10px;
          color: #252a2a;
        }
        .f-w1 {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 15px;
          color: #252a2a;
        }
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
        }
        #one1 {
          width: 350px;
          outline: none;
          vertical-align: middle;
          border: 1px solid #e3e3e6;
        }

        .addDec {
          outline: none;
          border: none;
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background: #2bd2a8;
          border-radius: 6px;
          margin-right: 20px;
        }
      }

      .inp-con1 {
        height: 50px;
        margin-right: 15px;
        padding-left: 15px;
      }

      .inp-con2 {
        width: 500px;
        height: 50px;
      }
    }
  }
}
</style>
