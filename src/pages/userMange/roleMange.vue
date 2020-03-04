<template>
  <div class="userm-wrapper">
    <div class="userm-content">
      <m-crums :con="crumsData" />
      <m-madd :con="dialogKey"/>
      <m-medit :con="dialogKey1" />
         <m-delete :con="tipsData" />
      <div class="shoot-inp" >
        <div class="inp-con" v-show="0">
          <button class="addDec" @click="addRole">新增</button>
        </div>

      </div>
       <div class="dec-list">
      <el-table :data="userdata" stripe style="width: 100%" highlight-current-row>
        <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="550" height="40" align="center" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="description" label="角色描述"  width="580"  height="40" align="center" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column fixed="right" label="操作" width="200" height="40" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small"  class="tableBtn">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small"  class="tableBtn">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

      <div class="slot-box">
      <el-pagination
        class="slot"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
   


    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MMadd from "@/components/ms/addRole.vue";
import MMedit from "@/components/ms/editRole.vue";
import MDelete from "@/components/ms/delete.vue";
import * as URL from "@/plugins/env.js";
export default {
  props: {},
  data() {
    return {
      tableData:[],

      username:'',

      dialogKey:false,
      dialogKey1:{
        key:false,
        id:'',
       
      },
      currentPage: 1,
      pagesize: 10,

      roleVal: "",
      roleId: "",
      roleArr: [],
     
      orgId: "",
      idNo: "",
      collecOrg:"",
      collecOrgArr: [],
      crumsData: {
        one: "用户管理",
        two: "角色管理"
      },
      tipsData:{
         key:false,
         id:'',
        value:'角色'

      },
    };
  },
  computed: {

       userdata: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  created() {
    this.getRoleArr();
    // this.getUserList();
  },
  


  methods: {

    addRole() {
         this.dialogKey = true
    },

    getRoleArr() {
      
      let VM = this;
      this.$http.api
        .get(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles?type=1&pageSize=30`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
           data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(data){
        this.tipsData.key = true;
        this.tipsData.id = data.id;
    },
    deleteItem(data){
     
      
        let VM  = this;
   
        this.$http.api
        .delete(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles/${data}`)
        .then(function(res) {
          console.log(res)
          if (res.status === 200) { 
            VM.$Message.success(`${res.data.msg}`);
            VM.getRoleArr()
          }else{
            VM.$Message.success(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //  console.log(this.userdata)
    },

    handleClick(data){
      console.log(data)
       this.dialogKey1.key = true;
       this.dialogKey1.id = data.id;
    }

  },
  components: {
    MCrums,
    MMadd,
    MMedit,
    MDelete
 
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/userMange/roleMange.scss";
</style>
