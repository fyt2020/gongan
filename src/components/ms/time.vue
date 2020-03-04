<template>
  <div class="home__time">
    <!-- <span class="am">{{new Date().getHours() > 12 ? "PM" : "AM"}}</span> -->
    <div class="home__timeL">
      <!-- <Time :time="time3" type="date" /> -->
      <span class="date__item">{{year}}</span>
      <span class="home__one1">
         <Icon type="ios-remove" />
      </span>
      <span class="date__item">{{Mon}}</span>
      <span class="home__one1">
         <Icon type="ios-remove" />
      </span>
      <span class="date__item">{{Day}}</span>

      <span class="home__one start">0</span>
      <span class="home__one">0</span>
      <span class="home__one1">:</span>
      <span class="home__one">0</span>
      <span class="home__one end">0</span>
      <span class="home__one1">:</span>
      <span class="home__one small">0</span>
      <span class="home__one end small">0</span>
    </div>

    <div class="home__timeR">
       <span class="timeR__con" @click="goTo">控制台</span>
    </div>

    <!-- <span class="date__item">{{week}}</span> -->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      year:"",
      Mon:"",
      Day: "",
      week: "",
      time2: null,
      time1: null,
      // time3: (new Date()).getTime(),
    };
  },
  computed: {},
  created() {
    // this.yearMonDay = new Date().toLocaleDateString();
    this.initTime2()
    this.timer2 = setTimeout(() => {
        this.initTime2()
    }, 432000);
  },
  mounted() {
    this.timer1 = setInterval(this.initTime, 1000);
  },
  beforeDestroy() {
    let VM = this;
    window.clearInterval(VM.timer2);
    window.clearInterval(VM.timer1);
  },
  watch: {},
  methods: {
     goTo() {
      let VM = this;
      //VM.$router.push({ name: "shootC" });
      let token = JSON.parse(localStorage.getItem("token"));
      let roleId = token.roleId;
       VM.$router.push({ name: "shootC" });
      this.$parent.exitFullscreen();

      // if (roleId == "545") {
      //   VM.$router.push({ name: "data" });
      //   localStorage.setItem("homeKey", JSON.stringify(true));
      // } else {
      //   VM.$router.push({ name: "shootC" });
      // }
    },
    initTime() {
      var spans = document.getElementsByClassName("home__one");
      var date = new Date();
      for (var i = 0; i < spans.length; i++) {
        var str =
          this.toDouble(date.getHours()) +
          this.toDouble(date.getMinutes()) +
          this.toDouble(date.getSeconds());
        spans[i].innerHTML = str.charAt(i);
      };
    },
    initTime2(){
       var date = new Date();
         this.year =  `${this.toDouble(date.getFullYear())}`;
         this.Mon =  `${this.toDouble(date.getMonth() + 1) }`;
         this.Day =  `${this.toDouble(date.getDate())}`;
    },
    toDouble(number) {
      if (number < 10) {
        return "0" + number;
      } else return "" + number;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.home__time {
  position: absolute;
  width: 1276px;
  display: flex;
  justify-content: space-between;
  left: 50%;
  top:50%;
  transform: translate(-52%,-50%);
  color: #36dbf9;
   .home__timeL{
     font-size: 16px;
     display: flex;
     align-items: center;
     .date__item{
        vertical-align: middle;
        font-family: 'Cri';
     }
     .home__one1{
          
     }
     .home__one{
       font-family: 'Cri';
         &.start{
           margin-left: 10px;
         }
         &.small{
               font-size: 12px;
               margin-top: 4px;
         }
     }
   }
  .home__timeR{
     font-size: 20px;
     cursor: pointer;
     .timeR__con{
       font-family: 'Heavy'
     }
   }
}
</style>
