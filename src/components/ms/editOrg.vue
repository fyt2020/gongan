<template>
  <div class="im-box">
    <el-dialog title="编辑组织" 
    :visible.sync="con.key" 
    width="36%" center 
    :before-close="handleClose" 
    :close-on-click-modal="false"
    class="addOrg">
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one3">
              <span class="f-w">机构名称</span>
              <input type="text" id="one3" class="inp" v-model="orgData.orgName" />
            </label>
          </div>
         
        </div>
        <div class="shoot-inp">
           <div class="inp-con">
            <label for="one2">
              <span class="f-w">单位编码</span>
              <input type="text" id="one2" class="inp" v-model="orgData.orgId" readonly />
            </label>
          </div>
        </div>

          <div class="shoot-inp">
          <div class="inp-con">
            <span class="f-w">单位地址</span>
            <div class="inp_box">
              <!-- <el-select v-model="provinceVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectProvince(item)"
                  v-for="item in province"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select> -->
                <input type="text" class="inp_adress" v-model="provinceVal" autocomplete="off" readonly/>
            </div>
            <div class="inp_box">
              <!-- <el-select v-model="cityVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectCity(item)"
                  v-for="item in city"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select> -->
                <input type="text" class="inp_adress" v-model="cityVal" autocomplete="off"  readonly/>
            </div>
            <div class="inp_box">
              <!-- <el-select v-model="areaVal" placeholder="请选择" class="province">
                <el-option
                  @click.native="selectArea(item)"
                  v-for="item in area"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select> -->
                <input type="text" class="inp_adress" v-model="areaVal" autocomplete="off" readonly/>
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
              <input type="text" id="one" class="inp linkman" v-model="orgData.linkman" />
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <span class="f-w">手机号</span>
              <input type="text" id="one1" class="inp linkman" v-model="orgData.linkPhone" />
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
        <el-button @click="giveUp">放弃</el-button>
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
      id:"",
      statusArr: "",
      adress: "",
      province: [],
      city: [],
      area: [],
      provinceVal: "",
      cityVal: "",
      areaVal: "",
      orgData: {
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
    getInf(data) {
      this.id = data;
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`
        )
        .then(function(res) {
          // console.log(res)
          if (res.data.code === 0) {
            console.log(res.data.result);
            let data = res.data.result;
            VM.orgData = data;

            if (res.data.result.status == 0) {
              VM.statusArr = "禁用";
            } else if (res.data.result.status == 1) {
              VM.statusArr = "启用";
            }
          } else {
            VM.$Message.error(`查询失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save() {
      this.$parent.roleInf1.key = false;
    },
    handleClose() {
      this.$parent.roleInf1.key = false;
    },
    giveUp() {
      this.$parent.roleInf1.key = false;
    },

    add() {
      if (
        !this.orgData.orgName ||
        !this.orgData.linkman ||
        !this.orgData.orgId ||
        !this.orgData.linkPhone
      ) {
        this.$message({
          message: "编辑内容不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      // this.orgData.id = this.con.id;
      this.orgData.parentId = this.con.parentId;
      this.orgData.belongOrgId = this.con.belongOrgId;
      this.orgData.area = "中国";
      this.orgData.address = "中国";
      if (this.statusArr == "禁用") {
        this.orgData.status = 0;
      } else if (this.statusArr == "启用") {
        this.orgData.status = 1;
      }
      let params = {
        orgName: this.orgData.orgName,
        linkman: this.orgData.linkman,
        orgId: this.orgData.orgId,
        status: this.orgData.status,
        linkPhone: this.orgData.linkPhone
      };

      let VM = this;
      this.$http.api
        .put(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${VM.id}`,
          params
        )
        .then(function(res) {
          // console.log(res);
          if (res.data.code === 0) {
            VM.$parent.roleInf1.key = false;
            // VM.$Message.success(`${res.data.msg}`);
            VM.$parent.getOrgList(VM.con.id);

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
    // height: 180px;
    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;
       color: #252a2a;
           .inp-adress {
        width: 100%;
        box-sizing: border-box;
        padding: 0 50px 0 85px;
        .inp_adr {
          width: 100%;
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
           .inp_box {
          margin-right: 20px;
          margin-left: 5px;
          .inp_adress{

               width: 100px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
              @media screen and (max-width:1440px){
                      height: 25px;
                      line-height: 25px;
                   }

          }
        }
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
              @media screen and (max-width:1440px){
                      height: 25px;
                      line-height: 25px;
                   }
    
            &.linkman{


              @media screen and (max-width:1440px){
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
