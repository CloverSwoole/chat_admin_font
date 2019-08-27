<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav nav-noe-list">
                <li v-for="item in routes" class="nav-noe-item">
                    <router-link :to="item.path" v-if="item.children&&item.children.length <= 0" tag="div" class="nav-link nav-dropdown-toggle">
                        <Icon :type="item.icon" color="white"/>
                        {{ item.name}}
                    </router-link>
                    <div v-if="item.children&&item.children.length >=1" class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <Icon :type="item.icon" color="white"/>
                        {{ item.name}}
                    </div>
                    <ul class="nav-dropdown-items" v-if="item.children&&item.children.length > 0">
                        <!--开始遍历二级菜单-->
                        <li class="nav-item" v-for="child in item.children" v-if='!child.hidden'>
                            <router-link tag="div" class="nav-dropdown-toggle" :to="item.path" v-if="child.children&&child.children.length <= 0">
                                    <Icon type="ios-arrow-right"></Icon>
                                    <!--<Icon type="ios-arrow-down"></Icon>-->
                                    {{ child.name}}
                            </router-link>
                            <div v-else class="nav-dropdown-toggle" @click="handleClick">
                                <Icon type="ios-arrow-right"></Icon>
                                <!--<Icon type="ios-arrow-down"></Icon>-->
                                {{ child.name}}
                            </div>
                            <ul class="nav-dropdown-items three" v-if="child.children&&child.children.length > 0">
                               <router-link tag="li" v-for="child_sub in child.children" v-bind:key="child_sub.id" :to="child_sub.path">
                                   {{child_sub.name}}
                               </router-link>
                            </ul>
                        </li>
                        <!--二级菜单遍历完毕-->
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    /**
     * 导航组件
     */
    export default {
        name: 'SidebarItem',
        props: {
            routes: {
                type: Array
            }
        },
        mounted() {
            console.log(this.routes);
        },
        methods: {
            handleClick(e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent {
        display: block;
        text-indent: 10px;
    }
    .nav-noe-item{
        width: 92px;
        height: 40px;
    }
    .nav-noe-list{
        background: #444;
        height: 100%;
        width: 92px;
    }
    .open{
        background: #fff;
        color: #333;
    }
    .nav-item{
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
    .nav-dropdown-items{
        display: none;
    }
    .nav-dropdown-items{
        position: fixed;
        top: 0;
        left: 92px;
    }
    .open>.nav-dropdown-items{
        display: block;
    }
    .three{
        position: absolute;
        top: 25px;
        left: 25px;
        /*z-index: 9999;*/
        height: auto;
        margin: 5px;
    }
</style>

