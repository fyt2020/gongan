<template>
  <div class="interll-wrapper">
    <m-delete :con="tipsData" />
    <div class="interll-con">
      <m-crums :con="crumsData" />
      <m-dialog :con="dialogKey" />

      <div class="shoot-inp">
        <div class="inp-con">
          <div class="left">
            <el-tooltip content="根据任务名称查询" placement="bottom">
              <input type="text" class="inp" v-model="searchVal" />
            </el-tooltip>
            <button class="addDec1" @click="seach">查询</button>
            <!-- <div class="upDate" @click="upDate"></div> -->
          </div>
          <div class="right">
            <button class="addDec" @click="goToAddMo">新增任务</button>
            <button class="addDec" @click="wactchAll">批量查看</button>
          </div>
        </div>
      </div>

      <div class="dec-list">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="index" label="序号" width="50" height="40" align="center"></el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
            width="300"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="targets"
            label="识别目标"
            width="300"
            height="40"
            align="center"
            :formatter="_stateFormat3"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="有效时间段"
            width="300"
            height="40"
            align="center"
            :formatter="_stateFormat2"
            :show-overflow-tooltip="true"
          ></el-table-column>
           <el-table-column
            prop="rule"
            label="创建时间"
            height="40"
            width="300"
            align="center"
            :formatter="_stateFormat4"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- <el-table-column
            prop="rule"
            label="识别后规则"
            height="40"
            width="220"
            align="center"
            :formatter="_stateFormat1"
            :show-overflow-tooltip="true"
          ></el-table-column> -->
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            height="40"
            align="center"
            :formatter="_stateFormat"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="deviceIds" label="监控设备" width="180" height="40" align="center" :show-overflow-tooltip='true'></el-table-column> -->
          <!-- <el-table-column prop="address" label="设备地点" width="180" height="40" align="center" :show-overflow-tooltip='true'></el-table-column> -->
          <el-table-column fixed="right" label="操作" width="180" height="40" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                class="tableBtn"
              >删除</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="tableBtn"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px" v-show="0">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
      <div class="slot-box">
        <el-pagination
          class="slot"
          background
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10,20,50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MDelete from "@/components/ms/delete.vue";
import MDialog from "@/components/ms/addTask.vue";
import {  mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      crumsData: {
        one: "三维人像应用",
        two: "实时识别",
        thr: "",
        now: null,
        pathGP: ""
      },
      currentPage: 1,
      pageNum: 1,
      pagesize: 8,
      dialogKey: false,
      total: 0,
      multipleSelection: [],
      tipsData: {
        key: false,
        id: "",
        value: "任务"
      },
      searchVal: "",
      tableData: [
        // {
        //   address: "武汉天远视",
        //   createTime: 1567414634540,
        //   id: "dsadsaxzx1111",
        //   index: 1,
        //   time: "00:00-24:00",
        //   name: "任务1",
        //   protocol: "H246",
        //   rule: "门禁",
        //   status: "启用",
        //   tag: ["小偷", "暴力"],
        //   targets: ["target1", "target2"],
        //   deviceIds: "雪山一号"
        // },
        // {
        //   address: "武汉天远视",
        //   createTime: 1567414634540,
        //   id: "dsadsaxzx1",
        //   index: 2,
        //   time: "00:00-24:00",
        //   name: "任务2",
        //   protocol: "H246",
        //   rule: "预警",
        //   status: "启用",
        //   tag: ["小偷", "抢劫"],
        //   targets: ["target1"],
        //   deviceIds: "雪山一号"
        // },
        // {
        //   address: "武汉天远视",
        //   createTime: 1567414634540,
        //   id: "dsadsaxzx2",
        //   index: 3,
        //   time: "00:00-24:00",
        //   name: "任务3",
        //   protocol: "H246",
        //   rule: "预警",
        //   status: "启用",
        //   tag: ["小偷"],
        //   targets: ["target1"],
        //   deviceIds: "雪山二号"
        // },
        //     {
        //   address: "武汉天远视",
        //   createTime: 1567414634540,
        //   id: "dsadsaxzx234",
        //   index: 3,
        //   time: "00:00-24:00",
        //   name: "任务4",
        //   protocol: "H246",
        //   rule: "预警",
        //   status: "启用",
        //   tag: ["小偷"],
        //   targets: ["target1"],
        //   deviceIds: "雪山二号"
        // },
        // {
        //   address: "武汉天远视",
        //   createTime: 1567414634540,
        //   id: "dsadsaxzx222",
        //   index: 3,
        //   time: "00:00-24:00",
        //   name: "任务5",
        //   protocol: "H246",
        //   rule: "预警",
        //   status: "启用",
        //   tag: ["小偷"],
        //   targets: ["target1"],
        //   deviceIds: "雪山二号"
        // },
      ]
    };
  },
  computed: {
        ...mapState(["choseIntellArr"])
        
  },
  created() {
    this.getTask();
  },
  methods: {

     ...mapMutations(["changeChoseIntellArr"]),

    getTask() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/tasks?taskType=1&pageNum=${VM.pageNum}&pageSize=${VM.pagesize}&name=${VM.searchVal}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            // VM.total = res.data.result.total;
            let data = res.data.result.list;

            if (data) {
              let data1 = res.data.result.list;
              VM.total = res.data.result.total;
              data.forEach((item, index) => {
                item["index"] = index + 1;
              });
              VM.tableData = data;
            } else {
              VM.tableData = [];
            }
            
            // console.log(VM.tableData);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goToAddMo() {
      this.dialogKey = true;

      // this.$router.push({name:'faceShow'})
    },
    handleClick(data) {
      // let id = data.id;
      // let index = data.index;
      // let routeData = this.$router.resolve({
      //   path: "/faceShow",
      //   query: { id, rtsp: window.BASEURL.taspUrl }
      // });
      // window.open(routeData.href, "_blank");

      let id = data.id;
      let index = data.index;
      let routeData = this.$router.resolve({
        path: "/faceShow3",
        query: { id, type: "single" }
      });
      window.open(routeData.href, "_blank");
    },
    handleDelete(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    deleteItem(data) {
      let VM = this;
      this.$http.api
        .delete(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("删除成功");
            VM.getTask();
          } else {
            VM.$Message.error("删除失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    wactchAll() {
      if (this.multipleSelection.length == 0) {
        this.$Message.error("没有选择要查看的任务");
        return;
      }

      let routeData = this.$router.resolve({
        path: "/faceShow3",
        query: { type: "all", data: JSON.stringify(this.multipleSelection)  }
      });
      window.open(routeData.href, "_blank");
    },
    seach(type) {
      //  if(!this.searchVal){
      //      this.$Message.error("搜索内容不能为空");
      //      return
      //  }
      //  let reg = /^[\s]*$/g;
      //  let key = reg.test(this.searchVal);
      //  if(key){
      //    this.$Message.error("搜索内容不能有空格");
      //    return
      //  }
      this.pageNum = 1;
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/tasks?taskType=1&name=${VM.searchVal}&pageNum=${VM.pageNum}&pageSize=${VM.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.crumsData.thr = "查询结果";
            VM.crumsData.now = 1;
            VM.crumsData.pathGP = "upDate";
            if (type != "update") {
              VM.$Message.success("搜索成功");
            }

            let data = res.data.result.list;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            VM.total = res.data.result.total;
          } else {
            VM.$Message.error("搜索失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    upDate() {
      this.searchVal = "";
      this.crumsData = {
        one: "三维人像应用",
        two: "实时识别",
        thr: "",
        now: null,
        pathGP: ""
      };
      this.getTask();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //改变每页显示条数
    _handleSizeChange(size) {
      this.pagesize = size;
      this.getTask();
    },
    //跳到某一页//
    _handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.pageNum = currentPage;
      this.getTask();
    },
    _stateFormat(row, colum) {
      // if(row.status == 1){
      //   return "禁用"
      // }else if(row.status == 0){
      //   return "启用"
      // }
      return "启用";
    },
    _stateFormat1(row, colum) {
      if (row.rule == 1) {
        return "预警提示";
      } else if (row.rule == 2) {
        return "门禁";
      }
    },
    _stateFormat2(row, colum) {
      let time = `${new Date(
        row.validStartTime
      ).toLocaleDateString()}--${new Date(
        row.validEndTime
      ).toLocaleDateString()}`;
      return time;
    },
    _stateFormat4(row, colum){
        let time = `${new Date(
        row.validStartTime
      ).toLocaleDateString()}`;
      return time
    },
    _stateFormat3(row, colum) {
      let time = [];
      row.targets.forEach(ele => {
        time.push(ele.libName);
      });
      return time.join(";");
    }
  },
  components: {
    MCrums,
    MDialog,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/intellRec.scss";
</style>
