<template>
  <div class="org-wrapper">
    <m-madd :con="roleInf" ref="add" />

    <m-maddC :con="roleInfC" ref="addC" />

    <m-medit :con="roleInf1" ref="edit" />

    <m-delete :con="tipsData" />

    <div class="org-content">
      <m-crums :con="crumsData" />
      <div class="org__box">
        <div class="org__tree">
          <div class="orgTree__box">
            <span class="orgTree__til">组织机构</span>
          </div>
          <el-tree
            :data="data1"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :expand-on-click-node="false"
            ref="tree1"
            @node-click="choseOne"
          ></el-tree>
        </div>

        <div class="dec-list">
          <div class="current__org">
            <div class="current__org__title">
              <span class="org__info">{{ currentOrg.orgName }}</span>
              <span @click="editOrg" class="editOrg">编辑</span>
            </div>

            <div class="shoot-inp">
              <div class="inp-con">
                <label for="one3">
                  <span class="f-w">单位名称</span>
                  <input
                    type="text"
                    id="one3"
                    class="inp"
                    v-model="currentOrg.orgName"
                    autocomplete="off"
                    :readonly="isRead"
                  />
                </label>
              </div>
              <div class="inp-con">
                <label for="one2">
                  <span class="f-w">单位编号</span>
                  <input
                    type="text"
                    id="one2"
                    class="inp"
                    v-model="currentOrg.orgId"
                    autocomplete="off"
                    :readonly="isRead"
                  />
                </label>
              </div>

              <div class="inp-con">
                <label for="one">
                  <span class="f-w">负责人</span>
                  <input
                    type="text"
                    id="one"
                    class="inp"
                    v-model="currentOrg.linkman"
                    autocomplete="off"
                    :readonly="isRead"
                  />
                </label>
              </div>
              <div class="inp-con">
                <label for="five">
                  <span class="f-w">手机号</span>
                  <input
                    type="text"
                    id="one1"
                    class="inp"
                    v-model="currentOrg.linkPhone"
                    autocomplete="off"
                    :readonly="isRead"
                  />
                </label>
              </div>
            </div>

            <div class="shoot-inp">
              <div class="inp-con" v-if="isRead">
                <span class="f-w">单位地址</span>
                <input
                  type="text"
                  id="address1"
                  class="inp2"
                  v-model="provinceVal"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address2"
                  class="inp2"
                  v-model="cityVal"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address3"
                  class="inp2"
                  v-model="areaVal"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address4"
                  class="inp1"
                  v-model="currentOrg.address"
                  autocomplete="off"
                  :readonly="isRead"
                />
              </div>

              <div class="inp-con" v-if="!isRead">
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
                <input
                  type="text"
                  id="address4"
                  class="inp1"
                  v-model="currentOrg.address"
                  autocomplete="off"
                  :readonly="!isRead"
                />
              </div>

              <div class="inp-con1">
                <span class="f-w1">状态</span>
              </div>
              <div class="inp-con2">
                <RadioGroup v-model="statusArr">
                  <Radio label="禁用" :disabled="isRead"></Radio>
                  <Radio label="启用" :disabled="isRead"></Radio>
                </RadioGroup>
              </div>

              <div class="inp-con" v-if="!isRead">
                <button @click="giveUp" class="giveUp">放弃</button>
                <button type="primary" @click="save" class="addDec">保存</button>
              </div>
            </div>
          </div>

          <div class="list__title">
            <span class="list_titleW">下级机构</span>
            <button class="addDec" @click="addNextOrg">新增采集单位</button>
          </div>

          <el-table id="dec_list" :data="tableData" style="width: 100%" highlight-current-row>
            <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
            <el-table-column
              prop="belongOrgName"
              label="所属单位"
              height="40"
              align="center"
              width="150"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="orgId"
              label="单位编号"
              width="150"
              height="40"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>

            <el-table-column
              prop="address"
              label="单位地址"
              height="40"
              align="center"
              width="150"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{((scope.row.area).split(' '))[1]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="linkman"
              label="负责人"
              width="150"
              height="40"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="linkPhone"
              label="手机号"
              width="150"
              height="40"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="150"
              height="40"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.status == 0 ? "禁用" : "启用"}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" height="40" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  class="tableBtn"
                >编辑</el-button>
                <el-button
                  @click="handleAdd1(scope.row)"
                  type="text"
                  size="small"
                  class="tableBtn"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
<!-- 
          <div class="slot-box">
            <div class="slot-con">
                <el-pagination
                class="slot"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10,20,50]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MMadd from "@/components/ms/addOrg.vue";
import MMaddC from "@/components/ms/addOrgC.vue";
import MMedit from "@/components/ms/editOrg.vue";
import MDelete from "@/components/ms/delete.vue";
export default {
  data() {
    return {
      data1: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      isRead: true, //是否可编辑
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      tipsData: {
        key: false,
        id: "",
        value: "文件"
      },

      province: [],
      city: [],
      area: [],
      provinceVal: "",
      cityVal: "",
      areaVal: "",

      //当前组织
      currentOrg: {
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        address: "",
        belongOrgId: "",
        area: "",
        children: []
      },
      statusArr: "",

      orgVal: "", //新增组织value
      addShow: false,
      parentId: "",
      buttonKey: true, // 组织btn  v-show

      tableData: [],
      orgName: "",
      total: 0,

      currentPage: 1,
      pagesize: 8,

      roleInf: {
        key: false,
        type: "",
        id: "",
        parentId: "",
        belongOrgId: ""
      },
      roleInfC: {
        key: false,
        type: "",
        id: "",
        parentId: "",
        belongOrgId: ""
      },
      roleInf1: {
        key: false,
        id: ""
      },
      orgId: "",
      idNo: "",
      collecOrg: "",
      collecOrgArr: [],
      crumsData: {
        one: "用户管理",
        two: "组织机构"
      }
    };
  },
  computed: {},

  created() {
    this.getOrgList();
  },
  methods: {
    /**
     * @Author fyt
     * @Description 选择省
     * @Date 2020-03-03 11:39:43 星期二
     */
    selectProvince(data) {
      console.log(data);
    },

    /**
     * @Author fyt
     * @Description 选择市
     * @Date 2020-03-03 11:39:57 星期二
     */
    selectCity(data) {
      console.log(data);
    },

    /**
     * @Author fyt
     * @Description  选择区
     * @Date 2020-03-03 11:40:14 星期二
     */
    selectArea(data) {
      console.log(data);
    },

    /**
     * @Author fyt
     * @Description 点击编辑 编辑组织
     * @Date 2020-02-28 10:30:29 星期五
     */
    editOrg() {
      this.isRead = !this.isRead;
    },
    /**
     * @Author fyt
     * @Description 放弃编辑
     * @Date 2020-02-28 10:30:53 星期五
     */
    giveUp() {
      this.editOrg();
    },
    /**
     * @Author fyt
     * @Description 保存编辑
     * @Date 2020-02-28 10:31:13 星期五
     */
    save() {
      let VM = this;
      let status;

      if (
        !this.currentOrg.orgName ||
        !this.currentOrg.linkman ||
        !this.currentOrg.orgId ||
        !this.currentOrg.linkPhone ||
        !this.currentOrg.area ||
        !this.statusArr
      ) {
        VM.$Message.error(`编辑内容不能为空`);
        return;
      }

      if (this.statusArr == "禁用") {
        status = 0;
      } else if (this.statusArr == "启用") {
        status = 1;
      }

      let { orgName, linkman, orgId, linkPhone, area } = this.currentOrg;
      let params = {
        orgName,
        linkman,
        orgId,
        status,
        linkPhone,
        area
      };
      console.log(params);

      this.$http.api
        .put(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${VM.currentOrg.id}`,
          params
        )
        .then(function(res) {
          console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`编辑成功`);
            VM.isRead = true;
            // VM.getOrgList();
            // console.log(res.data.result);
            // let data = res.data.result;
            // VM.orgData = data;

            // if (res.data.result.status == 0) {
            //   VM.statusArr = "禁用";
            // } else if (res.data.result.status == 1) {
            //   VM.statusArr = "启用";
            // }
          } else {
            VM.$Message.error(`编辑失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 新增下级组织
     * @Date 2020-02-28 10:31:47 星期五
     */
    addNextOrg() {
      this.roleInfC.key = true;
      this.roleInfC.id = this.currentOrg.id;
      this.roleInfC.parentId = this.currentOrg.parentId;
      this.roleInfC.belongOrgId = this.currentOrg.orgId;
    },
    /**
     * @Author fyt
     * @Description 查看某一组织的数据
     * @Date 2020-02-28 10:32:11 星期五
     */
    choseOne(data) {
      if (data) {
        this.currentOrg = data;
        this.tableData = data.children;
        this.tableData.forEach((item, index) => {
          item.index = index + 1;
        });
        if (data.status == "0") {
          this.statusArr = "禁用";
        } else if (data.status == "1") {
          this.statusArr = "启用";
        }
      }
    },
    /**
     * @Author fyt
     * @Description 获取当前数据
     * @Date 2020-02-28 10:32:28 星期五
     */
    getOrgList(DATA) {
      let VM = this;
      let newArr = [];
      // this.tableData = [
      //   {
      //     orgName: "上海市刑侦总队",
      //     accountName: "adminAccount",
      //     rolename: "超级管理员",
      //     description: null,
      //     telephone: "18645658966",
      //     updateTime: 1577243006049,
      //     accessToken: "d11d29fbaee74a379a694ce68396bc6a",
      //     parentId: "",
      //     orgId: "otgywab6uqa2g2a5",
      //     imgURL:
      //       "http://192.168.1.246/image/api/v1/images/90414d175d05ebf7c15916d107cc59ea",
      //     accountId: "134ca61f6c95412bb52e7f6c1e2df627",
      //     extendedProperties: { roleId: "545", name: "超管" },
      //     tenantName: null,
      //     createTime: 0,
      //     tenantId: "otgywab6uqa2g2a5",
      //     ifSelf: 0,
      //     name: "超管",
      //     projectId: "",
      //     email: "2323@qq.com",
      //     status: 1
      //   }
      // ];
      this.data1 = [
        {
          id: 1,
          orgId: "otgywab6uqa2g2a5",
          orgName: "上海市刑侦总队",
          createTime: 1555400472000,
          updateTime: 1575860551783,
          orgDescription: "市局",
          status: "1",
          area: "上海市 虹口区",
          address: "上海市",
          linkman: "张三",
          linkPhone: "15888888885",
          linkEmail: "test@qq.com",
          parentId: "",
          belongOrgName: "上海",
          cStatus: "启用",
          value: "otgywab6uqa2g2a5",
          label: "上海市刑侦总队",
          children: [
            {
              id: 103,
              orgId: "qpkss",
              orgName: "青浦看守所",
              createTime: 1575860689772,
              updateTime: 1575860689772,
              orgDescription: "",
              status: "1",
              area: "上海市 青浦区",
              address: "",
              linkman: "无",
              linkPhone: "18204125563",
              linkEmail: "",
              parentId: "1.",
              belongOrgName: "上海市刑侦总队",
              cStatus: "启用",
              value: "qpkss",
              label: "青浦看守所",
              children: [
                {
                  id: 109,
                  orgId: "das",
                  orgName: "das",
                  createTime: 1576575379302,
                  updateTime: 1576575379302,
                  orgDescription: "",
                  status: "1",
                  area: "上海市 青浦区",
                  address: "",
                  linkman: "dasdas",
                  linkPhone: "13437160811",
                  linkEmail: "",
                  parentId: "1.103.",
                  belongOrgName: "青浦看守所",
                  cStatus: "启用",
                  value: "das",
                  label: "das",
                  children: []
                },
                {
                  id: 113,
                  orgId: "ewda",
                  orgName: "测试",
                  createTime: 1582272871524,
                  updateTime: 1582272871524,
                  orgDescription: "",
                  status: "1",
                  area: "上海市 青浦区",
                  address: "",
                  linkman: "da",
                  linkPhone: "13566778877",
                  linkEmail: "",
                  parentId: "1.103.",
                  belongOrgName: "青浦看守所",
                  cStatus: "启用",
                  value: "ewda",
                  label: "测试",
                  children: []
                }
              ]
            },
            {
              id: 104,
              orgId: "srlpcs",
              orgName: "松润路派出所",
              createTime: 1575860739106,
              updateTime: 1575860739106,
              orgDescription: "",
              status: "1",
              area: "上海市 青浦区",
              address: "",
              linkman: "无",
              linkPhone: "15423695562",
              linkEmail: "",
              parentId: "1.",
              belongOrgName: "上海市刑侦总队",
              cStatus: "启用",
              value: "srlpcs",
              label: "松润路派出所",
              children: []
            },
            {
              id: 111,
              orgId: "TYSKJ01",
              orgName: "天远视科技",
              createTime: 1577434881380,
              updateTime: 1577434881380,
              orgDescription: "",
              status: "1",
              area: "上海市 浦东新区",
              address: "",
              linkman: "张三",
              linkPhone: "15821563214",
              linkEmail: "",
              parentId: "1.",
              belongOrgName: "上海市刑侦总队",
              cStatus: "启用",
              value: "TYSKJ01",
              label: "天远视科技",
              children: []
            }
          ]
        }
      ];

      VM.tableData = VM.data1[0].children;
      VM.currentOrg = VM.data1[0];
      if (VM.currentOrg.status == "0") {
        this.statusArr = "禁用";
      } else if (VM.currentOrg.status == "1") {
        this.statusArr = "启用";
      }

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations?flag=1`
        )
        .then(function(res) {
          // console.log(res)
          if (res.data.code === 0) {
            let data = res.data.result;
            // console.log(data);
            if (DATA) {
              console.log("更新");
              newArr.push(data);
              VM.data1 = newArr;
              VM.findOrgById(newArr, DATA);
            } else {
              console.log("初始化");

              VM.tableData = data.children;
              VM.tableData.forEach((item, index) => {
                item.index = index + 1;
              });

              newArr.push(data);
              VM.data1 = newArr;
              VM.currentOrg = data;
              if (data.status == "0") {
                VM.statusArr = "禁用";
              } else if (data.status == "1") {
                VM.statusArr = "启用";
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 每次新增，编辑，删除机构后
     * @Date 2020-02-28 10:33:31 星期五
     */
    findOrgById(data, id) {
      if (data.length == 0) {
        return ;
      } else {
        data.forEach(item => {
          if (item.id == id) {
            this.tableData = item.children;
            this.tableData.forEach((item, index) => {
              item.index = index + 1;
            });
          } else {
            this.findOrgById(item.children, id);
          }
        });
      }
    },
    /**
     * @Author fyt
     * @Description 删除某个机构
     * @Date 2020-02-28 10:34:55 星期五
     */
    deleteItem(data) {
      let VM = this;
      // console.log("currentOrg", VM.currentOrg);
      this.$http.api
        .delete(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`,
          VM.currentOrg
        )
        .then(function(res) {
          console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`删除成功`);
            VM.getOrgList(VM.currentOrg.id);
          } else {
            VM.$Message.error(`删除失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 改变每页显示条数
     * @Date 2020-02-28 10:35:53 星期五
     */
    handleSizeChange(size) {
      this.pagesize = size;
    },
    /**
     * @Author fyt
     * @Description 跳到某一页
     * @Date 2020-02-28 10:36:04 星期五
     */
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //  console.log(this.userdata)
    },
    /**
     * @Author fyt
     * @Description 编辑下级机构
     * @Date 2020-02-28 10:36:21 星期五
     */
    handleClick(data) {
      this.roleInf1.id = this.currentOrg.id;
      this.roleInf1.key = true;
      this.roleInf1.parentId = data.parentId;
      this.roleInfC.belongOrgId = data.belongOrgId;
      this.$refs.edit.getInf(data.id);
    },
    /**
     * @Author fyt
     * @Description 确认删除(下级组织)
     * @Date 2020-02-28 10:36:43 星期五
     */
    handleAdd1(data) {
      // console.log(data)
      this.tipsData.key = true;
      this.tipsData.id = data.id;
      this.tipsData.value = "机构";
    }
  },
  components: {
    MCrums,
    MMadd,
    MMedit,
    MMaddC,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/userMange/organizational.scss";
</style>
