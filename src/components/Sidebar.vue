<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <div class="sidebar">
                <div class="left-nav-lists">
                    <div class="left-nav-item" v-for="(item,index) in siderbar_routers">
                        <div class="left-nav-item-one nav-link nav-dropdown-toggle" @click="GoToRoute(item.children[0].path,true,name)" v-if="item.children.length > 0" :class="{'aaa':item.name === activeItem}">
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </div>
                        <div @click="GoToRoute(item.path)" class="left-nav-item-one nav-link nav-dropdown-toggle" v-else>
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </div>
                        <div class="right-sub-nav-list" v-if="item.children.length > 0">
                            <div class="title">{{item.title}}</div>
                            <router-link tag="div" :to="child.path" v-for="child in item.children" class="right-sub-nav-item nav-link nav-dropdown-toggle">
                                <Icon :type="child.icon" color="white"/>
                                {{ child.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';

    /**
     * 导航组件
     */
    export default {
        name: 'sidebar',
        computed: {
            ...mapGetters([
                'siderbar_routers'
            ])
        },
        data(){
            return {
                activeItem:'',
            };
        },
        watch:{
            $route(val){
                this.activeItem = val.matched[0].name;
                console.log(this.activeItem)
            }
        },
        methods: {
            handleClick(index) {
                this.routes[index].selected = true;
                console.log(this.routes[index]);
                return ;
                e.preventDefault();
                e.target.parentElement.classList.toggle('open')
            },
            /**
             * 点击一级导航
             * @param path
             * @constructor
             */
            GoToRoute(path,len,name)
            {
                var e = window.event || arguments.callee.caller.arguments[0];
                for(var index in e.target.parentElement.parentElement.childNodes){
                    if(typeof e.target.parentElement.parentElement.childNodes[index] == 'object'){
                        e.target.parentElement.parentElement.childNodes[index].classList.remove('one-selected');
                    }
                }
                e.target.parentElement.classList.toggle('one-selected');
                this.$router.push({path:path});
                if(len){
                    document.body.classList.add('left-nav-right')
                }else{
                    document.body.classList.remove('left-nav-right')
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .left-nav-lists{
        width: 94px;
        background: #444444;
        height: 100%;
        padding-top: 55px;

    }
    .sidebar-nav{
        width: auto;
    }
    .left-nav-item{
        width: 94px;
        height: 40px;
        color: #fff;
    }
    .one-selected{
        color: #444;
        background: #eee;
    }
    .one-selected > .right-sub-nav-list{
        display: block;
    }
    .right-sub-nav-list{
        display: none;
    }
    .right-sub-nav-list{
        width: 106px;
        align-items: center;
        position: fixed;
        left:94px;
        top:55px;
        color: #444444;
        background: #fff;
    }
    .right-sub-nav-list>.title{
        align-items: center;
        border-bottom: 1px solid #ebedf0;
        padding-left: 28px;
        font-size: 14px;
        line-height: 56px;
        font-weight: 500;
    }
    .right-sub-nav-item{

    }


    .nav-link {
        cursor: pointer;
    }



    .wscn-icon {
        margin-right: 10px;
    }

    .hideSidebar .menu-indent {
        display: block;
        text-indent: 10px;
    }

    .nav-noe-item {
        width: 92px;
        height: 40px;
    }

    .nav-noe-item:hover {
        background: #666;
    }

    .nav-noe-list {
        background: #444;
        height: 100%;
        width: 92px;
    }
    .nav-item {
        width: 108px;
        height: auto;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 16px;
        min-height: 30px;
        line-height: 30px;
        color: #323233;
        margin: 24px 0;
        font-size: 14px;
    }

    .nav-dropdown-items {
        display: none;
    }

    .nav-dropdown-items {
        position: fixed;
        top: 0;
        left: 92px;
    }

    .open > .nav-dropdown-items {
        display: block;
    }

    .three {
        position: absolute;
        top: 25px;
        left: 25px;
        /*z-index: 9999;*/
        height: auto;
        margin: 5px;
    }
    .active{
        background: rgb(89, 113, 250);
        color: #fff;
    }
</style>
