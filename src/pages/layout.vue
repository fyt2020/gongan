<template>
  <div class="layout-wrapper">
    <m-head />
    <div class="content-one">
      <m-nav />
      <div class="con">
         <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import MHead from "@/components/header/header.vue";
import MNav from "@/components/navigation/navigation.vue";
import { mapState, mapMutations } from "vuex";
export default {
  // beforeRouteEnter(to, from, next) {
  //   let roleId = JSON.parse(localStorage.getItem("token")).roleId;
  //   // console.log(rolename)
  //   if (roleId == "545") {
  //     next(vm => {
  //       vm.$router.push({ name: "data" });
  //       vm.changeDataClass({val:0})
  //     });
  //   }else{
  //       next(vm => {
  //       vm.$router.push({ name: "shootC" });
  //     });
  //   }
  // },
  data() {
    return {};
  },
  methods:{
     ...mapMutations(["changeDataClass"]),
  },
  components: {
    MHead,
    MNav
  }
};
</script>
<style lang="scss">
@import "@/assets/css/layout/layout.scss";
</style>