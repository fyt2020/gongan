<template>
  <div class="im-box">
    <el-dialog
      title="新增采集单位"
      :visible.sync="con.key"
      class="addOrg"
      width="36%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one3">
              <span class="f-w">单位名称</span>
              <input type="text" id="one3" class="inp" v-model="orgData.orgName" autocomplete="off" />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one2">
              <span class="f-w">单位编码</span>
              <input type="text" id="one2" class="inp" v-model="orgData.orgId" autocomplete="off" />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <span class="f-w">单位地址</span>
            <div class="inp_box">
              <el-select v-model="provinceVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectProvince(item)"
                  v-for="item in province"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
            <div class="inp_box">
              <el-select v-model="cityVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectCity(item)"
                  v-for="item in city"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
            <div class="inp_box">
              <el-select v-model="areaVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectArea(item)"
                  v-for="item in area"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-adress">
            <!-- <span class="f-w">单位地址</span> -->
            <input type="text" class="inp_adr" v-model="adress" autocomplete="off" />
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">负责人</span>
              <input
                type="text"
                id="one"
                class="inp linkman"
                v-model="orgData.linkman"
                autocomplete="off"
              />
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <span class="f-w">手机号</span>
              <input
                type="text"
                id="one1"
                class="inp linkman"
                v-model="orgData.linkPhone"
                autocomplete="off"
              />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">状态</span>
          </div>
          <div class="inp-con2">
            <RadioGroup v-model="statusArr">
              <Radio label="禁用"></Radio>
              <Radio label="启用"></Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="dialogBtn">放弃</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  props: ["con"],
  data() {
    return {
      options: regionData,
      adress: "",
      province: [],
      city: [],
      area: [],
      provinceVal: "",
      cityVal: "",
      areaVal: "",

      // selectedOptions: [],
      // newArr : [],
      // area:[],
      statusArr: "",
      orgData: {
        id: "",
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        belongOrgId: "",
        area: "",
        adress: ""
      }
    };
  },
  computed: {},
  created() {},

  methods: {
    /**
     * @Author fyt
     * @Description 选择省
     * @Date 2020-03-04 11:22:17 星期三
     */
    selectProvince(data) {},
    /**
     * @Author fyt
     * @Description 选择市
     * @Date 2020-03-04 11:22:45 星期三
     */
    selectCity(data) {},
    /**
     * @Author fyt
     * @Description 选择区
     * @Date 2020-03-04 11:31:40 星期三
     */
    selectArea(data) {},

    getInf(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`
        )
        .then(function(res) {
          // console.log(res)
          if (res.data.code === 0) {
            //   console.log(res)
            VM.area = res.data.result.area;
            //   console.log(res.data.result.area)
            // // let arr = [];
            // // let one = "";
            // // let two = "";
            // // let three = "";
            // // VM.newArr = res.data.result.area.split(' ');
            // // one =  res.data.result.area.split(' ')[0];
            // // two =  res.data.result.area.split(' ')[1];
            // // three =  res.data.result.area.split(' ')[2];
            // // VM.selectedOptions.push(TextToCode[one].code)
            // // VM.selectedOptions.push(TextToCode[one][two].code)
            // // VM.selectedOptions.push(TextToCode[one][two][three].code)

            // // console.log(VM.selectedOptions)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // handleChange(value) {
    //   let  str = '市辖区';
    //   let  arr = [];
    //   this.area = [];
    //    this.selectedOptions.forEach(item =>{
    //             arr.push(CodeToText[item])
    //    })
    //    arr.forEach(item =>{
    //           if(item.indexOf('辖') !== 1)
    //             this.area.push(item)
    //    })

    // },

    handleClose() {
      this.giveUp();
    },
    giveUp() {
      this.orgData = {
        id: "",
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        belongOrgId: "",
        area: "",
        adress: ""
      };
      this.adress = "";
      this.$parent.roleInfC.key = false;
    },
    add() {
      if (
        !this.orgData.orgName ||
        !this.orgData.linkman ||
        !this.orgData.orgId ||
        !this.orgData.linkPhone ||
        !this.statusArr
      ) {
        this.$message({
          message: "新增内容不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.adress.length == 0) {
        this.$message({
          message: "所属区域不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      // this.orgData.id = this.con.id;
      this.orgData.parentId = this.con.parentId;
      this.orgData.belongOrgId = this.con.belongOrgId;
      this.orgData.adress = this.adress;

      if (this.statusArr == "禁用") {
        this.orgData.status = 0;
      } else if (this.statusArr == "启用") {
        this.orgData.status = 1;
      }
      // console.log(this.orgData);
      let VM = this;
      this.$http.api
        .post(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations`,
          VM.orgData
        )
        .then(function(res) {
          // console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`添加成功`);
            // VM.$parent.roleInfC.key = false;
            // VM.$parent.tableData.unshift(  VM.orgData );
            VM.$parent.getOrgList(VM.con.id);
            VM.giveUp();
         
          } else {
            VM.$message({
              message: `${res.data.msg}`,
              type: "warning",
              customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 100%;
    // height: 200px;

    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;
      color: #252a2a;
      .inp-adress {
        width: 100%;
        box-sizing: border-box;
        padding-left: 85px;
        .inp_adr {
          width: 300px;
          // width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
          @media screen and (max-width: 1440px) {
            height: 25px;
            line-height: 25px;
          }
        }
      }

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
          // color: #252a2a;
        }
        .f-w1 {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 15px;
          // color: #252a2a;
        }
        .el-cascader {
          width: 190px;
        }
        .inp_box {
          margin-right: 20px;
          margin-left: 5px;
        }
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
          @media screen and (max-width: 1440px) {
            height: 25px;
            line-height: 25px;
          }

          &.linkman {
            @media screen and (max-width: 1440px) {
              width: 80px;
            }
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

        height: 30px;
        margin-right: 15px;
        padding-left: 40px;
        display: flex;
        align-items: center;
      }

      .inp-con2 {
        height: 30px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
