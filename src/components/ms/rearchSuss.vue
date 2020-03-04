<template>
    <div class="rearch__box" v-if="show">
        <Icon type="ios-checkmark-circle" v-show="type == 'suss'" class="ios-checkmark-circle"/>
        <Icon type="ios-close-circle" v-show="type == 'error'" class="ios-close-circle"/>
        <span :class="['con__word',{'suss':type == 'suss','error':type == 'error'}]">{{type == "suss" ? '查询成功': '查询失败'}}</span>
    </div>
</template>

<script>
export default {
    props:["type","show"],
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.rearch__box{
    display: inline-block;
    pointer-events: all;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    background: #fff;
    position: absolute;
    z-index: 1150;
    top:-97px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
     .ios-checkmark-circle{

         color:#59ba73;
     }
     .ios-close-circle{
         color:#dc412c;

     }
     .con__word{
          display: inline-block;
          color: #5A516E;
          margin-left: 5px;
     }
}
</style>
