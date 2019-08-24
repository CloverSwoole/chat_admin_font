<template>
    <div class="navigation-lists">
        <i-table :columns="columns" :data="table"></i-table>
    </div>
</template>
<script>
    import axiosService from './../../utils/axiosService';
    export default {
        name: 'NavigationLists',
        data () {
            return {
                columns:[
                    {
                        title: "ID",
                        key: "id"
                    },
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "路径",
                        key: "path"
                    },
                    {
                        title: "图标",
                        key: "icon",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('Icon', {
                                props: {
                                    type:this.table[params.index].icon
                                },
                                style: {},
                            })]);
                        }
                    },
                    {
                        title: "组件",
                        key: "component"
                    },
                    {
                        title: "类型",
                        key: "hidden",
                        render: (h, params) => {
                            if(this.table[params.index].hidden == 1){
                                return '路由';
                            }else{
                                return '菜单';
                            }
                        }
                    },
                    {
                        title: "重定向",
                        key: "redirect"
                    },
                    {
                        title: "创建时间",
                        key: "created_at"
                    },
                    {
                        title: "最后更新时间",
                        key: "updated_at"
                    },
                    {
                        title: "操作",
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editNavigation(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteNavigation(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                table:[],
            }
        },
        created:function(){
            axiosService.getService().post('/Admin/Navigation/lists').then((data)=>{
                this.table = data.data;
            });
        },
        methods:{
            editNavigation:function(index)
            {

            },
            deleteNavigation:function(index){
                axiosService.getService().post('/Admin/Navigation/remove',{ids:[this.table[index].id]}).then((data)=>{
                    if(data.data.status == 200){
                        this.table.shift(index,1);
                    }
                    console.log(data.data);
                });
            }
        },
    }
</script>
