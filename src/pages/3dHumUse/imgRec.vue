<template>
  <div class="imgR-warpper">
    <m-ms :con="tipsData"/>
    <div class="imgR-content">
      <div class="left">
        <div class="left__wrap">
             <div class="title__box">
              <m-crums :con="crumsData" />
             </div>

        <div
          :class="['upload__box',{'reged':regImgKey}]"
          v-loading="loading1"
          element-loading-text="识别中..."
          element-loading-background="rgba(0, 0, 0, 0.2)"
        >
          <img
            src="../../assets/img/delete.png"
            alt
            class="delete__img"
            v-show="hasUpload"
            @click="goBack"
          />
          <img src="../../assets/img/image.png" alt class="no__img" v-if="btnKey" />
          <img :src="`${originImgUrl}`" alt class="decorateImgUrl" v-if="originImgKey" />
          <img :src="`${originImgUrl}`" alt class="createdOrgImg" v-if="smallImgKey" />
          <img :src="`${originImgUrl}`" alt class="sWbigHImg" v-if="sWbigHImgkey" />
          <img :src="`${originImgUrl}`" alt class="bigHImg" v-if="bigHImgKey" />
          <canvas class="canvasId" v-show="regImgKey" :class="{'big':isBig}"></canvas>
          <button class="btn" @click="uploadFile2" v-if="btnKey">
            导入图片
            <form
              name="fileList"
              id="fileList"
              action="uploadURL"
              method="POST"
              enctype="multipart/form-data"
              class="file"
            >
              <input
                type="file"
                hidden
                @change="beforeUploadFile2($event)"
                id="upload_file2"
                class="file-inp"
              />
            </form>
          </button>
          <span v-if="btnKey" class="toplic">请导入jpg或png格式的图片</span>
        </div>
        </div>
       
     
        <div class="target__box">
          <div class="title">识别目标
            <span class="sub__con" v-show="rightArr.length > 0 ">(共有{{rightArr.length}}个识别目标)</span>
          </div>
            <ul :class="['recently__box',{'now':rightArr.length > 0}]">
              <span class="no__recently" v-show="!hasUpload">识别未开始，暂无目标</span>
              <span class="no__recently" v-show="rightArr.length == 0 && hasUpload">未检测到目标人脸</span>
              <template v-for="(item,index) in rightArr">
                <li class="recently__item" :key="index" v-show="hasUpload">
                  <img
                    :src="`${imgUrl}/${Md5}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                    alt
                    class="item__img"
                    v-show="item.x"
                  />
                </li>
              </template>
            </ul>

          <!-- <transition name="el-zoom-in-top">
            <ul :class="['recently__box']" v-show="rightArr.length == 0">
              <span class="no__recently" v-show="!hasUpload">识别未开始，暂无目标</span>
              <span class="no__recently" v-show="rightArr.length == 0 && hasUpload">未检测到目标人脸</span>
            </ul>
          </transition>
          <transition name="el-zoom-in-bottom">
            <ul :class="['recently__boxNow']" v-show="rightArr.length > 0">
              <template v-for="(item,index) in rightArr">
                <li class="recently__item" :key="index" v-show="hasUpload">
                  <img
                    :src="`${imgUrl}/${Md5}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                    alt
                    class="item__img"
                    v-show="item.x"
                  />
                </li>
              </template>
            </ul>
          </transition> -->
        </div>
      </div>
      <div class="right">
        <p class="r__title">识别结果
           <span class="sub__con" v-show="rightArr.length > 0 ">(共有{{rightArr.length}}个识别结果)</span>
        </p>
        <div :class="['right__con',{'now':rightArr.length > 0}]">
          <!-- <span class="no__result" v-if="rightArr.length == 0">暂无识别结果</span> -->
          <img src="../../assets/img/img3/noresult.png" alt="" class="no__resultimg" v-if="rightArr.length == 0">
          <ul :class="['right__conBox']">
            <template v-for="(item,index) in rightArr ">
              <li class="right__item" :key="index" v-if="hasUpload">
                <div class="right__left">
                  <img :src="`${imgUrl}/${item.angleImg}`" alt class="item__img" />
                </div>

                <!-- <img :src="`${imgUrl}2460a2c49192251593592c7dd41edea6_file/1111.jpg`" v-if="item.possibility > 0.2"/> -->
                <div class="right__mid">
                  <p class="isLibrary__name">{{item.username}}</p>
                  <p class="isLibrary__collect">采集编号</p>
                  <p class="isLibrary__num">{{item.id}}</p>
                  <p class="isLibrary__box">相似度:{{ ((item.possibility* 100).toFixed(2)) }}%</p>
                  <!-- <p class="notLibrary" v-if="item.possibility < 0.2">非库中</p>
                    <p class="notLibrary" v-if="item.possibility < 0.2">人员</p>
                    <p class="isLibrary__name" v-if="item.possibility > 0.2">{{item.usename}}</p>
                    <p class="isLibrary__collect" v-if="item.possibility > 0.2">采集编号</p>
                    <p class="isLibrary__num" v-if="item.possibility > 0.2">{{item.id}}</p>
                  <p class="isLibrary__box" v-if="item.possibility > 0.2">相似度:{{ (item.possibility.toFixed(2)) * 100 }}%</p>-->
                </div>
                <div class="right__right">
                  <img
                    :src="`${imgUrl}/${Md5}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                    alt
                    class="item__img"
                  />
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MMs from "@/components/ms/tips.vue";
export default {
  props: {},
  data() {
    return {
      hasUpload: false, //是否上传
      loading1: false, //是否识别
      originImgKey: false, //原始图片w>1000
      smallImgKey: false, //原始图片w<1000
      bigHImgKey: false, //原始图片w<1000 h < 562
      sWbigHImgkey: false, //原始图片w<1000 h > 562
      regImgKey: false, //识别图片
      btnKey: true,
      isBig: false,
      Md5: "",
      file: "",
      chunkSize: 1024 * 0.5, // 指定文件分块大小(2M)
      chunks: "", // 计算文件分块总数
      currentChunk: 0, // 指定当前块指针
      fileReader: "", // 创建文件读取对象
      blobSlice: "", // 根据浏览器获取文件分割方法
      spark: "", //创建MD5计算对象
      start: "",
      end: "",
      timer: null,
   
      rightArr: [],
      crumsData: {
        one: "三维人像应用",
        two: "图像识别"
      },
      tipsData:{
         key:false,
         c:'图片',
         severNum:'',
         severStatus:null,
      },
      notLibrary: false,
      imgUrl: "",
      originImgUrl: "",
      decorateImgUrl: "",
    };
  },
  computed: {},
  created() {
    this.imgUrl = window.BASEURL.imgUrl;
    this.getServerStatus('first');
  },

  methods: {

    //检测
    getServerStatus(type){
       let VM = this;
       this.$http.api
        .post(`${window.BASEURL.serverUrl}/facerecog/api/v1/getserviceinfo`, {
          headers: {
            "Content-Type":"application/json"
          },
          timeout:1000
          })
        .then(function(res) {
          if (res.status === 200 && res.statusText == "OK") {
            let data = res.data;
           //console.log(data)
            if(data.lauch == 1){
                 VM.tipsData.key = true;
                 VM.tipsData.severNum = data[2];
                 VM.tipsData.severStatus = 'suc'
            }else if(data.lauch == 0){
                 VM.tipsData.key = true;
                 VM.tipsData.severStatus = 'false'
            }
          }
        })
        .catch(function(error) {
          VM.tipsData.key = true;
          VM.tipsData.severStatus = 'false'
          console.log(error);
        });
    },
    goBack() {
      this.rightArr = [];
      this.btnKey = true;
      this.decorateImgUrl = "";
      this.originImgUrl = "";
      this.hasUpload = false;
      this.regImgKey = false; //识别图片
    },
    uploadFile2() {
      // this.getServerStatus('touch');
      let file = document.getElementById("upload_file2");
      if(this.tipsData.severStatus == 'false' || !this.tipsData.severStatus){
          this.$Message.error(`识别服务没有开启,不能上传图片!`);
          return
      }else{
          file.click();
      }
    },
    beforeUploadFile2(e) {
      let VM = this;
      let reg = /[\u4e00-\u9fa5]/g;
      let nameArr = e.target.files[0].name.split(".");
      let len = nameArr.length;
      let startName = e.target.files[0].name.split(".")[0];
      let key1 = reg.test(startName);
      let endName = nameArr[ len - 1 ];
      if (endName != "jpg" && endName != "png") {
        VM.$Message.error(`上传图片格式不是jpg或png!`);
        return;
      }
      // if (key1) {
      //   VM.$Message.error(`图片命名不能为中文!`);
      //   return;
      // }
      if (!document.getElementById("upload_file2").files[0]) {
        return;
      }
      this.loading1 = true;
      let file = new FormData();
      file.append("file", document.getElementById("upload_file2").files[0]);
      this.$http.api
        .post(window.BASEURL.imgUrl, file, { config: { ContentType: "form" } })
        .then(res => {
          if (res.status == 200) {
            VM.Md5 = res.data.result.datas[0].md5;
            // console.log(VM.Md5)
            VM.btnKey = false;
            VM.originImgUrl = `${VM.imgUrl}/${VM.Md5}`;
            VM.createdOrgImg();
            VM.createdTask(VM.Md5, e.target.files[0].name);
            // VM.query(VM.Md5, e.target.files[0].name, e.target.files[0]);
          } else {
            vm.$message({
              message: "上传失败!",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.file = document.getElementById("upload_file2").files[0];
      // this.chunks = Math.ceil(this.file.size / this.chunkSize);
      // this.fileReader =  new FileReader();
      // this.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
      // this.spark = new SparkMD5.ArrayBuffer();

      // this.loadNext();

      // this.fileReader.onload = function(){
      //      VM.spark.append(this.result);
      //      VM.currentChunk += 1;
      //      if (VM.currentChunk < VM.chunks) {
      //               VM.loadNext();
      //           } else {
      //               VM.Md5  = VM.spark.end();
      //               VM.query(VM.Md5,e.target.files[0].name, e.target.files[0])
      //           }
      // }
    },
    createdOrgImg() {
      let img = new Image();
      let VM = this;
      let W = $('.upload__box').width();
      let H = $('.upload__box').height();
      img.src = `${this.imgUrl}/${this.Md5}`;
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        // console.log(img.width);
        // console.log(img.height);
        if (img.width > W && img.height > H && (img.width/img.height)>= 1.78 ) {
          VM.originImgKey = true;
        } else if (img.width > W && img.height > H && (img.width/img.height) < 1.78) {
          VM.smallImgKey = true;
        }else if (img.width > W && img.height < H) {
          VM.smallImgKey = true;
        } else {
          if (img.height > H  ) {
            VM.sWbigHImgkey = true;
          } else {
            VM.bigHImgKey = true;
          }
        }
      };
      // console.log(VM.bigHImgKey);
      // console.log(VM.sWbigHImgkey);
      // console.log(VM.smallImgKey);
      // console.log(VM.originImgKey);
    },
    //画框
    createdImg(imgUrl1, data) {
      console.log(data)
      let len = data.length;
      let canvas = document.getElementsByClassName("canvasId")[0];
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = `${this.imgUrl}/${imgUrl1}`;
      let spX, spY;
      let W = $('.upload__box').width();
      let H = $('.upload__box').height();
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        let targetW, targetH;
        spX = W / img.width;
        spY = H / img.height;
        console.log(img.width);
        console.log(img.height);
        if (imgW > W) {
          targetW = imgW * spX;
          targetH = imgH * spX;
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          }
        } else {
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          } else {
            targetW = imgW;
            targetH = imgH;
          }
        }
        // console.log(spX);
        // console.log(spY);
        // console.log(targetW);
        // console.log(targetH);

        canvas.width = targetW;
        canvas.height = targetH;

        ctx.drawImage(img, 0, 0, targetW, targetH);
        ctx.strokeStyle = "#FF0000";
        ctx.strokeWidth = 1;
        ctx.lineWidth = 2;
        if (len > 0) {
          if (imgW > W && imgH < H) {
            console.log(1);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spX,
                item.y * spX,
                item.w * spX,
                item.h * spX
              );
            });
          } else if (imgW > W && imgH > H) {
            console.log(2);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spY,
                item.y * spY,
                item.w * spY,
                item.h * spY
              );
            });
          } else {
            if (imgH > H) {
              console.log(3);
              data.forEach((item, index) => {
                ctx.strokeRect(
                  item.x * spY,
                  item.y * spY,
                  item.w * spY,
                  item.h * spY
                );
              });
            } else {
              console.log(4);
              data.forEach((item, index) => {
                ctx.strokeRect(item.x, item.y, item.w, item.h);
              });
            }
          }
        }
      };
    },
    // loadNext(){
    //     this.start = this.currentChunk * this.chunkSize;
    //     this.end = this.start + this.chunkSize >= this.file.size ? this.file.size : this.start + this.chunkSize;
    //     this.fileReader.readAsArrayBuffer(this.blobSlice.call(this.file,this.start,this.end));
    // },
    //查询任务
    query(data, name, file) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
        )
        .then(res => {
          let data1 = res.data;
          if (data1.code == 421) {
            console.log("没有任务");
            VM.created(data, name, file);
          } else if (data1.code == 0) {
            console.log("有任务");
            VM.imgRecg1(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //创建容器
    created(Data, Name, File) {
      let Url = `oss/v1/AUTH_FS2Face/${Data}_file`;
      let VM = this;
      VM.$http.api
        .put(
          Url,
          {},
          {
            headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" }
          }
        )
        .then(res => {
          console.log("创建容器");
          if (res.status == 201 || res.status == 202) {
            VM.upLoad(Data, Name, File);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //上传图片
    upLoad(DATA, NAME, FILE) {
      console.log(DATA, NAME, FILE);
      let Url = `oss/v1/AUTH_FS2Face/${DATA}_file/${NAME}`;
      let VM = this;
      VM.$http.api
        .put(Url, FILE, {
          headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" }
        })
        .then(res => {
          if (res.status == 201) {
            console.log("上传图片");
            VM.createdTask(DATA, NAME);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //创建任务
    createdTask(id, fileName) {
      let VM = this;
      let params = {
        taskType: 2,
        id,
        fileAddr: `${id}`
      };
      VM.$http.api
        .post(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks`,
          params
        )
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            console.log("创建任务成功");
            VM.query1(id);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    query1(data, name, file) {
     
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
        )
        .then(res => {
          let data1 = res.data.result;
          let frameNum = data1.frameNum;
          let status = data1.status;
          console.log(frameNum)
          if ( status != 5  ) {
            clearInterval(VM.timer);
            VM.timer = window.setInterval(()=>{
                VM.query1(data)
            }, 1000);
          } else {
            clearInterval(VM.timer);
            VM.imgRecg1(data);
            VM.loading = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    imgRecg1(data) {
      let VM = this;
      VM.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/imgRecg?frameId=${data}&orderByClause=${encodeURIComponent('TRUNCATE(X,-1)')},Y`
        )
        .then(res => {
          if (res.status == 200) {
            let data1 = res.data.result;
            console.log(data1);
            VM.rightArr = data1.list;
            let len = VM.rightArr.length;
            if (len == 0) {
              VM.$Message.success("识别完成!");
            }
            VM.hasUpload = true;
            VM.loading1 = false;
            VM.originImgKey = false;
            VM.smallImgKey = false;
            VM.bigHImgKey = false;
            VM.sWbigHImgkey = false;
            VM.regImgKey = true;
            VM.createdImg(data, VM.rightArr);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

  },
  beforeDestroy() {
      window.clearInterval(this.timer);
      this.timer = null;
  },
  components: {
    MCrums,
    MMs
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/imgRec.scss";
</style>