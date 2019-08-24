<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <template v-for="item in routes">
                    <!--开始遍历一级菜单-->
                    <router-link tag="li" class="nav-item nav-dropdown"
                                 v-if="!item.hidden&&item.children&&item.children.length>0"
                                 :to="item.path+''+item.children[0].path" disabled>
                        <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </div>
                        <ul class="nav-dropdown-items">
                            <!--开始遍历二级菜单-->
                            <li class="nav-item" v-for="child in item.children" v-if='!child.hidden' @click="addActive">
                                <router-link :to="child.path" class="nav-link">
                                    <Icon :type="child.icon" color="white"/>
                                    {{ child.name}}
                                </router-link>
                            </li>
                            <!--二级菜单遍历完毕-->
                        </ul>
                    </router-link>

                    <!--不隐藏并且没有子菜单-->
                    <li class="nav-item" v-if="!item.hidden && item.children.length<1">
                        <router-link :to="item.path" class="nav-link" exact>
                            <Icon :type="item.icon" color="white"/>
                            {{ item.name}}
                        </router-link>
                    </li>
                    <!-- 一级菜单遍历完毕 -->
                </template>
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
            console.log(this.routes)
        },
        methods: {
            handleClick(e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            },
            addActive(e) {
                e.preventDefault()
                e.target.parentElement.parentElement.parentElement.classList.add('open')
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
</style>

