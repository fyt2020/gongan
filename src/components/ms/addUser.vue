<template>
  <div class="im-box">
    <el-dialog
      title="新增用户"
      :visible.sync="con.key"
      width="36%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="addUser"
    >
      <div class="task-con">
        <p class="sub-title">基础信息</p>
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one3">
              <span class="f-w">用户名</span>
              <input
                type="text"
                id="one3"
                class="inp"
                v-model="deviceData.name"
                autocomplete="off"
                :readonly="con.type == 'edit'"
              />
            </label>
            <span class="inp_tips1">*用户名创建后不可修改</span>
          </div>
          <div class="inp-con">
            <label for="one2">
              <span class="f-w">手机号码</span>
              <input
                type="text"
                id="one2"
                class="inp"
                v-model="deviceData.telephone"
                autocomplete="off"
              />
            </label>
          </div>
        </div>

        <p class="sub-title">组织信息</p>
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="five">
              <span class="f-w">所属机构</span>
              <el-select
                v-model="deviceData.orgName"
                placeholder="请选择"
                class="add-sec"
                v-if="con.type=='add' && orgData.parentId == ''"
              >
                <el-option
                  @click.native="selectOrg(item)"
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.orgName"
                  :value="item.orgName"
                ></el-option>
              </el-select>

              <input
                type="text"
                id="one4"
                class="inp"
                v-model="deviceData.orgName"
                autocomplete="off"
                :readonly="con.type == 'add'"
                v-if="con.type=='add' && orgData.parentId != ''"
              />

              <input
                type="text"
                id="one4"
                class="inp"
                v-model="deviceData.orgName"
                autocomplete="off"
                :readonly="con.type == 'edit'"
                v-if="con.type=='edit'"
              />
            </label>
          </div>

          <div class="inp-con">
            <label for="five">
              <span class="f-w">角色</span>
              <el-select v-model="roleVal" placeholder="请选择" class="add-sec">
                <el-option
                  @click.native="selectRole(item)"
                  v-for="item in roleArr"
                  :key="item.rolename"
                  :label="item.rolename"
                  :value="item.rolename"
                ></el-option>
              </el-select>
            </label>
          </div>
        </div>
        <p class="sub-title">账号信息</p>
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">登陆账号</span>
              <input
                type="text"
                id="one"
                class="inp"
                v-model="deviceData.accountName"
                autocomplete="off"
                :readonly="con.type == 'edit'"
              />
            </label>
          </div>

          <div class="inp-con">
            <label for="one1">
              <span class="f-w">密码</span>
              <input
                type="text"
                id="one1"
                class="inp"
                v-model="deviceData.accountPasswd"
                autocomplete="off"
                :readonly="con.type == 'edit'"
              />
            </label>
            <span
              class="inp_tips2"
              v-if="con.type == 'edit' && resetPassw == '重置密码'"
              @click="restPassW"
            >{{resetPassw}}</span>
            <span class="inp_tips3" v-if="con.type == 'edit' && resetPassw == '重置成功'">
              <i class="el-icon-success"></i>
              {{resetPassw}}
            </span>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">状态</span>
          </div>
          <div class="inp-con2">
            <RadioGroup v-model="deviceData.status">
              <Radio label="禁用" :disabled="con.type == 'edit'"></Radio>
              <Radio label="启用" :disabled="con.type == 'edit'"></Radio>
            </RadioGroup>
            <!-- <CheckboxGroup v-model="deviceData.status" @on-change="checkAllGroupChange2">
              <Checkbox label="禁用" ></Checkbox>
              <Checkbox label="启用" :disabled="con.type == 'edit'"></Checkbox>
            </CheckboxGroup>-->
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveup" class="dialogBtn">放弃</el-button>
        <el-button type="primary" @click="add">保存</el-button>
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
      indeterminate: true,
      checkAll: false,
      deviceData: {
        accountName: "",
        accountPasswd: "",
        name: "",
        orgId: "",
        roleId: "",
        telephone: "",
        status: ""
      },
      orgData: {
        orgId: "",
        orgName: "",
        createTime: "",
        updateTime: "",
        orgDescription: "",
        status: "",
        area: "",
        address: "",
        linkman: "",
        linkPhone: "",
        linkEmail: "",
        parentId: "",
        belongOrgName: "",
        cStatus: "",
        value: "",
        label: "",
        children: []
      },
      options3: [],
      roleArr: [],
      roleVal: "",
      resetPassw: "重置密码"
    };
  },
  computed: {},
  created() {
    this.getOrg();
    this.getRoleArr();
  },

  methods: {
    handleClose() {
      this.giveup();
    },
    selectOrg(data) {
      this.deviceData.orgId = data.orgId;
    },
    selectRole(data) {
      this.deviceData.roleId = data.id;
    },
    getOrg() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/farsee2/api/v1/organizations`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            // console.log(data)
            VM.options3 = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getRoleArr() {
      //获取标签
      let VM = this;
      this.$http.api
        .get(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles?type=1`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            data = data.filter((item, index) => {
              return item.id != "545";
            });
            VM.roleArr = data;
            console.log(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description  新增用户
     * @Date 2020-02-27 13:59:55 星期四
     */

    add() {
      let VM = this;
      let sha1 = require("sha1");
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

      if (this.con.type == "add") {
        console.log("add");
        console.log(this.deviceData.status);
        if (
          !this.deviceData.accountName ||
          !this.deviceData.name ||
          !this.deviceData.orgId ||
          !this.deviceData.accountPasswd ||
          !this.deviceData.telephone ||
          !this.deviceData.roleId
        ) {
          this.$message({
            message: "新增内容不能为空",
            type: "warning",
            customClass: "zZindex"
          });
          return;
        }
        let key = reg.test(this.deviceData.accountPasswd);
        if (!key) {
          this.$message({
            message: "密码为6-16数字字母",
            type: "warning",
            customClass: "zZindex"
          });
          return;
        }
        let params = {
          accountName: this.deviceData.accountName,
          accountPasswd: sha1(this.deviceData.accountPasswd),
          name: this.deviceData.name,
          orgId: this.deviceData.orgId,
          roleId: this.deviceData.roleId,
          telephone: this.deviceData.telephone,
          status: ""
        };
        if (this.deviceData.status == "启用") {
          params.status = 1;
        } else if (this.deviceData.status == "禁用") {
          params.status = 0;
        }
        this.$http.api
          .post(
            window.BASEURL.testUrl1 + `parent-police/farsee2/api/v1/accounts`,
            params
          )
          .then(function(res) {
            if (res.status === 200) {
              if (
                res.data.msg == "帐号已经存在" ||
                res.data.msg == "手机号已经存在" ||
                res.data.msg == "手机号不合法"
              ) {
                VM.$message({
                  message: `${res.data.msg}`,
                  type: "warning",
                  customClass: "zZindex"
                });
                return;
              } else {
                VM.giveup();
                VM.$Message.success(`${res.data.msg}`);
                VM.$parent.getUserList(VM.$parent.orgId);
              }
            } else {
              VM.$Message.error(`${res.data.msg}`);
            }
          })
          .catch(function(error) {
            console.log(error);
            VM.$Message.error(`添加失败`);
          });
      } else if (this.con.type == "edit") {
        console.log("edit");
        console.log(this.deviceData.telephone);
        console.log(this.deviceData.orgId);

        if (!this.deviceData.telephone || !this.deviceData.orgId) {
          this.$message({
            message: "编辑内容不能为空",
            type: "warning",
            customClass: "zZindex"
          });
          return;
        }
        let params = {
          telephone: this.deviceData.telephone,
          roleId: this.deviceData.roleId
        };
        this.$http.api
          .put(
            window.BASEURL.testUrl1 +
              `parent-police/farsee2/api/v1/accounts/${VM.deviceData.accountId}`,
            params
          )
          .then(function(res) {
            if (res.status === 200) {
              VM.$parent.addData.key = false;
              VM.$parent.addData.type = "";
              VM.$Message.success(`编辑成功`);

              VM.$parent.getUserList(VM.$parent.orgId);
            } else {
              VM.$Message.error(`${res.data.msg}`);
            }
          })
          .catch(function(error) {
            console.log(error);
            VM.$Message.error(`添加失败`);
          });
      }
    },
    /**
     * @Author fyt
     * @Description 重置密码
     * @Date 2020-02-27 15:23:45 星期四
     */
    restPassW() {
      this.$parent.handleClick(this.deviceData);
    },
    /**
     * @Author fyt
     * @Description 放弃操作
     * @Date 2020-02-27 13:59:27 星期四
     */
    giveup() {
      this.deviceData = {
        accountName: "",
        accountPasswd: "",
        name: "",
        orgId: "",
        roleId: "",
        telephone: ""
      };
      this.orgData = {
        orgId: "",
        orgName: "",
        createTime: "",
        updateTime: "",
        orgDescription: "",
        status: "",
        area: "",
        address: "",
        linkman: "",
        linkPhone: "",
        linkEmail: "",
        parentId: "",
        belongOrgName: "",
        cStatus: "",
        value: "",
        label: "",
        children: []
      };
      this.roleVal = "";
      this.$parent.addData.key = false;
      this.$parent.addData.type = "";
    }

    /**
     * @Author fyt
     * @Description
     * @Date 2020-02-27 13:59:19 星期四
     */
    // checkAllGroupChange2(data) {

    //   console.log(data);
    // }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.im-box {
  .task-con {
    width: 100%;
    height: 220px;
    .sub-title {
      font-size: 16px;
      color: #252a2a;
      font-weight: 500;
    }
    .shoot-inp {
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .inp-con {
        display: flex;
        align-items: center;
        margin-right: px2Rem(36px);
        justify-content: space-between;
        position: relative;
        .inp_tips1 {
          font-size: 12px;
          position: absolute;
          bottom: -25px;
          left: 85px;
          color: #f20;
        }
        .inp_tips2 {
          font-size: 12px;
          position: absolute;
          bottom: -30px;
          right: 0;
          color: rgb(24, 69, 250);
        }
        .inp_tips3 {
          font-size: 12px;
          position: absolute;
          bottom: -30px;
          right: 0;
          color: #67c23a;
        }

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
          font-weight: 500;
        }
        .inp {
          width: px2Rem(190px);
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
          @media screen and (max-width: 1440px) {
            width: 120px;
          }
        }
        .add-sec {
          width: 190px;
          @media screen and (max-width: 1440px) {
            width: 120px;
          }
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
        width: 70px;
        text-align: right;
        height: 50px;
        margin-right: 15px;
        padding-left: 15px;
        color: #252a2a;
      }

      .inp-con2 {
        width: 500px;
        height: 50px;
      }
    }
  }
}
</style>
