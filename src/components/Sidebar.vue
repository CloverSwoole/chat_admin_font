<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <div class="sidebar">
                <div class="left-nav-lists">
                    <div class="left-nav-item" v-for="(item,index) in siderbar_routers" :key="index" :class="{'one-selected':ifShowActive(item)}">
                        <div class="left-nav-item-one nav-link nav-dropdown-toggle" @click="GoToRoute(item.children[0].path,true,item.name)" v-if="item.children && item.children.length > 0">
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </div>
                        <div @click="GoToRoute(item.path)" class="left-nav-item-one nav-link nav-dropdown-toggle" v-else>
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </div>
                        <div class="right-sub-nav-list" v-if="item.children && item.children.length > 0">
                            <div class="title">{{item.title}}</div>
                            <router-link tag="div" :to="child.path" v-for="child in item.children" v-bind:key="child.id" class="right-sub-nav-item nav-link nav-dropdown-toggle">
                                <Icon :type="child.icon"/>
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
    import router from '../router';
    import navigation from "../api/navigation";
    /**
     * 导航组件
     */
    export default {
        name: 'sidebar',
        data(){
            return {
                siderbar_routers:[],
                activeItem:'',
            };
        },
        created()
        {
            /**
             * 获取导航
             */
            navigation.getRoutes().then((data)=>{
                /**
                 * 添加路由
                 */
                router.addRoutes(data);
                /**
                 * 设置遍历的数据
                 */
                this.siderbar_routers = data;
            });

            this.activeItem = window.localStorage.getItem('last_route_name');
        },
        methods: {
            /**
             * 跳转到指定路由
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
                window.localStorage.setItem('last_route_name',name);
                this.$router.push({path:path});
                if(len){
                    document.body.classList.add('left-nav-right')
                }else{
                    document.body.classList.remove('left-nav-right')
                }
            },
            ifShowActive(data){
                if(data.children)
                if(data.name  == this.activeItem){
                    if(data.children.length > 0){
                        document.body.classList.add('left-nav-right')
                    }
                    return true
                }else{
                    return false
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
